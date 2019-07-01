import storageService from '../services/storageService'
import consts from '../consts'
import firebaseService from '../services/firebaseService'

const GROUP_ORDER = 3267000013;//BigInt("282174488599599500573849980909");


function powerMod(base, power, modulo) {
  let x = base;
  let y = null;
  if (power % BigInt(2) == BigInt(1)) {
    y = base;
  } else {
    y = BigInt(1);
  }
  let n_prim = power / BigInt(2);

  while (n_prim > BigInt(0)) {
    x = (x ** BigInt(2)) % modulo;
    if (n_prim % BigInt(2) == BigInt(1)) {
      y = y === BigInt(1) ? x : (y * x) % modulo;
    }
    n_prim = n_prim / BigInt(2);
  }
  return y;
}


function generateEphemeralValue () {
  const a = Math.floor(Math.random() * GROUP_ORDER)
  storageService.set(consts.yourEphemeralValueStorageKey, a)
  return a
}

function getOrCreateEphemeralValue () {
  return storageService.get(consts.yourEphemeralValueStorageKey) || generateEphemeralValue();
}

function powerModEachElement(set, power) {
  return set.map(element => Number(powerMod(BigInt(element), BigInt(power), BigInt(GROUP_ORDER))));
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

  const yourSet  = Object.values(storageService.get(consts.yourSetStorageKey));

  // Encode yourSet with privkey
  const privateKey = getOrCreateEphemeralValue();
  const yourPartialSet = encodeYourSet(yourSet, privateKey);
  // TODO: the problem lies in the line above - there is an error during converting BigInt <-> value
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

    console.log('anonPartialSet', anonPartialSet);

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

    console.log('anonFullSet', yourFullSet);

    if (!LAST_GENERATED_ANON_FULL_SET) await updateAnonFullSet();

    const anonFullSet = LAST_GENERATED_ANON_FULL_SET;

    // Return
    return getNumberOfMutualPoints(yourFullSet, anonFullSet);
}



export default { checkNumberOfMutualPoints, updateYourPartialSet, updateAnonFullSet }