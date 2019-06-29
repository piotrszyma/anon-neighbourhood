function computeCoordinates (latitude, longitude) {
  longitude = Math.floor(longitude)
  latitude = Math.ceil(latitude)

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

async function getLocation (nickname) {
  const url = ''

  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const params = { nickname: nickname }
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const response = await fetch(url, data)

  if (response.status === Response.ok) {
    return response.body['location']
  } else {

  }
  // fetch(url).then(/* … */)
}

async function setOwnLocation (latitude, longitude) {
  const body = computeCoordinates(latitude, longitude)
  body['nickName'] = localStorage.getItem('nickName')

  const url = 'https://anon-neighbour.firebaseio.com/positions/adam/piotr.json'

  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  const response = await fetch(url, data)
  console.log(response)
}

export { getLocation, setOwnLocation }
