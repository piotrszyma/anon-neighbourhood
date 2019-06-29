import storageService from '../services/storageService'
import consts from '../consts'
import firebaseService from '../services/firebaseService'

const GROUP_ORDER = 3267000013;//BigInt("282174488599599500573849980909");



function performPSI () { 
    const {GSet, a} = generateGSet()
    sendG(GSet)

    const HSet = getH()
}

function sendG (set) {
    const whoseSet = storageService(consts.yourNicknameStorageKey)
    const whoSet = storageService(consts.anonNicknameStorageKey)
    firebaseService.sendPartialSet(whoseSet, whoSet, set)
}

function getH () {
    const whoseSet = storageService(consts.anonNicknameStorageKey)
    const whoSet = storageService(consts.yourNicknameStorageKey)
    return firebaseService.getPartialSet(whoseSet, whoSet)
}

function sendA (set) {
    
    const whoseSet = storageService(consts.anonNicknameStorageKey)
    const whoSet = storageService(consts.yourNicknameStorageKey)
    return firebaseService.sendFullSet(whoseSet, whoSet, set)
}

function getB () {

}


function checkNumberOfMutualPoints (yourSet, anonSet) {
    mutualSet = yourSet.filter(value => -1 !== anonSet.indexOf(value))
    return mutualSet.length
}

function generateGSet () {
    const a = getOrCreateEphemeralValue()
    const GSet = storageService.get(consts.yourSetStorageKey).map(el => Math.pow(el, a));
    return {GSet, a}
}

function getOrCreateEphemeralValue () {
    return storageService.get(consts.yourEphemeralValueStorageKey) || generateEphemeralValue();
}

function generateEphemeralValue () {
    const a = Math.random() * GROUP_ORDER
    storageService.set(consts.yourEphemeralValueStorageKey, a)
    return a
}

function generateASet (HSet) {
    const a = storageService.get(consts.yourEphemeralValueStorageKey)
    const ASet = HSet.map(el => Math.pow(el, a))
    return ASet;
}

export default { checkNumberOfMutualPoints }