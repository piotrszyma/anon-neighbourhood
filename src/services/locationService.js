import cryptoService from '../services/cryptoService'

function computeCoordinates (latitude, longitude) {
  const longitude = parseFloat(Math.floor(longitude))
  const latitude = parseFloat(Math.ceil(latitude))
  const upperLeft = longitude + 1 + (90 - latitude) * 360
  const upperRight = upperLeft + 1
  const lowerLeft = longitude + 1 + (90 - (latitude - 1)) * 360
  const lowerRight = lowerLeft + 1
  let coordinates = {
    upperLeft,
    upperRight,
    lowerLeft,
    lowerRight
  }
  return coordinates
}

function isNeighbourhood (yourSet, anonSet) {
  return cryptoService.checkNumberOfMutualPoints(yourSet, anonSet) > 0
}

// async function getLocation (nickname) {
//   const url = ''

//   const data = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }
//   const params = { nickname: nickname }
//   Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

//   const response = await fetch(url, data)

//   if (response.status === Response.ok) {
//     return response.body['location']
//   } else {

//   }
//   // fetch(url).then(/* … */)
// }

// async function setOwnLocation (latitude, longitude) {
//   const body = computeCoordinates(latitude, longitude)
//   body['nickName'] = consts.YourNicknameStorageKey
// }

export { computeCoordinates, isNeighbourhood }
