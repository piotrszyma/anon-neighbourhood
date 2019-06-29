import storageService from '../services/storageService'
import consts from '../consts'

const GROUP_ORDER = 1111;

function checkNumberOfMutualPoints (yourSet, anonSet) {
    mutualSet = yourSet.filter(value => -1 !== anonSet.indexOf(value))
    return mutualSet.length
}

function generateGSet () {

    const gSet = storageService.get(consts.yourSetStorageKey)
    // hash ???

    // pick random exponent
    const a = Math.random(GROUP_ORDER)

    // G = g ** a
    const gSet = gSet.map(el => Math.pow(el, a));

    return {gSet, a}
}

function generateASet (HSet) {
    const ASet = HSet.map(el => Math.pow(el, a));
    return ASet;
}

export default { checkNumberOfMutualPoints }