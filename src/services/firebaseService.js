import storageService from "./storageService";
import consts from '../consts';

function performCommunication (numberOfRetries, func, ...args) {
    try {
        func(...args)
    } catch(error) {

    }
}

function sendPartialSet (whoseSet, whoSet, set) {
    // const whoseSet = storageService(consts.yourNicknameStorageKey)
    // const whoSet = storageService(consts.anonNicknameStorageKey)
    // const set = storageService(consts.yourSetStorageKey)
    body = {}
    body['set'] = set // TODO: check the name
    const url = `https://anon-neighbour.firebaseio.com/positions/${whoseSet}/${whoSet}.json`
    const response = sendSet(url, body)
    // TODO: do stuff depending on the reponse 
}

function sendFullSet (whoseSet, whoSet, set) {
    // const whoseSet = storageService(consts.anonNicknameStorageKey)
    // const whoSet = storageService(consts.yourNicknameStorageKey)
    // const set = storageService(consts.anonSetStorageKey)
    body = {}
    body['set'] = set // TODO: check the name
    const url = `https://anon-neighbour.firebaseio.com/partial-positions/${whoseSet}/${whoSet}.json`
    const response = sendSet(url, body);
    
    // TODO: do stuff depending on the reponse 
}

function getPartialSet (whoseSet, whoSet) {
    const url = `https://anon-neighbour.firebaseio.com/positions/${whoseSet}/${whoSet}.json`
    const response = getSet(url, body)
    // TODO: do stuff depending on the reponse 
    return reponse
}

function getFullSet (whoseSet, whoSet) {
    const url = `https://anon-neighbour.firebaseio.com/partial-positions/${whoseSet}/${whoSet}.json`
    const response = getSet(url, body);
    return response 
}

async function sendSet (url, body) {
    const data = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(url, data)
    return reponse 
}

async function getSet () {
    const response = await fetch(url)
    // TODO: unpack values?? 
    return reponse 
}


export default { sendFullSet, sendPartialSet, getFullSet, getPartialSet }