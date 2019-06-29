function sendPartialSet (whoseSet, whoSet, set) {
    body = {}
    body['set'] = set // TODO: check the name
    const url = `https://anon-neighbour.firebaseio.com/positions/${whoseSet}/${whoSet}.json`
    const response = sendSet(url, body)
    // TODO: do stuff depending on the reponse 
}

function sendFullSet (whoseSet, whoSet, set) {
    body = {}
    body['set'] = set // TODO: check the name
    const url = `https://anon-neighbour.firebaseio.com/partial-positions/${whoseSet}/${whoSet}.json`
    const response = sendSet(url, body);
    
    // TODO: do stuff depending on the reponse 
}

function sendSet (url, body) {
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

function getSet () {

}
