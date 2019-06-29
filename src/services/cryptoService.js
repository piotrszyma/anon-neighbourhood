const GROUP_ORDER = 2137;


function privateSetIntersection (yourSet, anonSet) {


    // const set = 
    // generate G set
    // const {gSet, a} = generateGS 

    return numberOfMutualPoints
}

function generateGSet (gSet) {
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