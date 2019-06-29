import storageService from "./storageService";
import consts from '../consts';

function performCommunication (numberOfRetries, func, ...args) {
    try {
        func(...args)
    } catch(error) {

    }
}

async function sendPartialSet (whoGenerated, forWhom, set) {
    const data = { set }
    const url = `https://anon-neighbour.firebaseio.com/partial-positions/${whoGenerated}/${forWhom}.json`
    const response = await sendSet(url, data)
    return response;
}

async function sendFullSet (whoGenerated, forWhom, set) {
    const data = { set }
    const url = `https://anon-neighbour.firebaseio.com/positions/${whoGenerated}/${forWhom}.json`
    const response =  await sendSet(url, data);
    return response;
}

async function getPartialSet (whoGenerated, forWhom) {
    const url = `https://anon-neighbour.firebaseio.com/partial-positions/${whoGenerated}/${forWhom}.json`
    const data = await getSet(url)
    if (!data) throw Error("Anon did not calculated his PartialSet yet.");
    // Get last returned data....
    return data.set
}

async function getFullSet (whoGenerated, forWhom) {
    const url = `https://anon-neighbour.firebaseio.com/positions/${whoGenerated}/${forWhom}.json`
    const data = await getSet(url)
    if (!data) throw Error("Anon did not calculated your FullSet yet.");
    // Get last returned data....
    return data.set
}

async function sendSet (url, data) {
    const payload = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, payload)
    return await response.json();
}

async function getSet (url) {
    const response = await fetch(url);
    // TODO: unpack values??
    return await response.json();
}


export default { sendFullSet, sendPartialSet, getFullSet, getPartialSet }