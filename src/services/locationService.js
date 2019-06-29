import cryptoService from '../services/cryptoService'

function computeCoordinates (latitude, longitude) {
  longitude = parseFloat(Math.floor(longitude))
  latitude = parseFloat(Math.ceil(latitude))
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

function isNeighbourhood () {
  const yourSet = storageService.get(consts.anonSetStorageKey)
  const anonSet = storageService.get(consts.yourSetStorageKey)
  return cryptoService.checkNumberOfMutualPoints(yourSet, anonSet) > 0
}

export default { computeCoordinates, isNeighbourhood }
