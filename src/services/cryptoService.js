import storageService from '../services/storageService'
import consts from '../consts'
import firebaseService from '../services/firebaseService'
import bigInt from 'big-integer'

const GROUP_ORDER = 3267000013;//BigInt("282174488599599500573849980909");

const _2 = bigInt(2);
const _1 = bigInt(1);
const _0 = bigInt(0);

function powerMod(base, power, modulo) {
  let x = bigInt(base);
  power = bigInt(power);
  modulo = bigInt(modulo);
  let y = null;
  if (power.mod(_2).equals(_1)) {
    y = base;
  } else {
    y = _1;
  }
  let n_prim = power.divide(_2);

  while (n_prim.gt(_0)) {
    x = x.pow(_2).mod(modulo);
    if (n_prim.mod(_2).equals(_1)) {
      if (y.equals(_1)) {
        y = x;
      } else {
        y = y.times(x).mod(modulo);
      }

    }
    n_prim = n_prim.divide(_2);
  }
  return y;
}

function generateEphemeralValue () {
  let a = 1;
  while (a == 1) {
    a = Math.floor(Math.random() * GROUP_ORDER)
  }
  storageService.set(consts.yourEphemeralValueStorageKey, a)
  return a
}

function getOrCreateEphemeralValue () {
  return storageService.get(consts.yourEphemeralValueStorageKey) || generateEphemeralValue();
}

function powerModEachElement(set, power) {
  return set.map(element => Number(powerMod(bigInt(element), bigInt(power), bigInt(GROUP_ORDER))));
}

function encodeYourSet(set, privateKey) {
  return powerModEachElement(set, privateKey);
}

function encodePartialAnonSet(set, privateKey) {
  return powerModEachElement(set, privateKey);
}

function getNumberOfMutualPoints (yourSet, anonSet) {
  const mutualSet = yourSet.filter(value => anonSet.includes(value))
  return mutualSet.length
}

async function updateYourPartialSet() {
  console.log('Updating my partial set on firebase...');

  // Get data from local storage.
  const yourNickname =  storageService.get(consts.yourNicknameStorageKey)
  const anonNickname = storageService.get(consts.anonNicknameStorageKey);

  console.log('yourSet', storageService.get(consts.yourSetStorageKey));

  const yourSet  = Object.values(storageService.get(consts.yourSetStorageKey));

  // Encode yourSet with privkey
  const privateKey = getOrCreateEphemeralValue();
  const yourPartialSet = encodeYourSet(yourSet, privateKey);

  console.log('yourPartialSet', yourPartialSet);

  // Send yourPartialSet set to anon.
  await firebaseService.sendPartialSet(yourNickname, anonNickname, yourPartialSet)
}

let ANON_PARTIAL_SET_STRINGIFIED_CACHE = '';
let LAST_GENERATED_ANON_FULL_SET = null;

async function updateAnonFullSet() {

    // Get data from local storage.
    const yourNickname =  storageService.get(consts.yourNicknameStorageKey)
    const anonNickname = storageService.get(consts.anonNicknameStorageKey);

    // Wait for anonPartialSet.
    const anonPartialSet = await firebaseService.getPartialSet(anonNickname, yourNickname);
    const anonPartialSetStringified = JSON.stringify(anonPartialSet);

    console.log('updateAnonFullSet -> anonPartialSet', anonPartialSet);

    if (anonPartialSetStringified === ANON_PARTIAL_SET_STRINGIFIED_CACHE) return;
    console.log('Need to update anonFullSet... updating!');
    ANON_PARTIAL_SET_STRINGIFIED_CACHE = anonPartialSetStringified;

    // Power anonPartialSet to your privkey.
    const privateKey = getOrCreateEphemeralValue();
    const anonFullSet = encodePartialAnonSet(anonPartialSet, privateKey);
    console.log('anonFullSet', anonFullSet);
    LAST_GENERATED_ANON_FULL_SET = anonFullSet;
    await firebaseService.sendFullSet(yourNickname, anonNickname, anonFullSet);
}

/**
 * Method performs PSI to obtain mutual points.
 */
async function checkNumberOfMutualPoints () {
    // Get data from local storage.
    const yourNickname =  storageService.get(consts.yourNicknameStorageKey)
    const anonNickname = storageService.get(consts.anonNicknameStorageKey);

    // updateYourPartialSet();
    // updateAnonFullSet();

    // Get yourFullSet from anon.
    const yourFullSet = await firebaseService.getFullSet(anonNickname, yourNickname);

    console.log('yourFullSet', yourFullSet);

    if (!LAST_GENERATED_ANON_FULL_SET) await updateAnonFullSet();
    const anonFullSet = LAST_GENERATED_ANON_FULL_SET;
    return getNumberOfMutualPoints(yourFullSet, anonFullSet);
}

export default { checkNumberOfMutualPoints, updateYourPartialSet, updateAnonFullSet }
