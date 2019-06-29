import cryptoService from '../services/cryptoService'

function computeCoordinates (latitude, longitude) {
  longitude = parseFloat(Math.floor(longitude))
  latitude = parseFloat(Math.ceil(latitude))
  const upperLeft = longitude + 1 + (90 - latitude) * 360
  const upperRight = upperLeft + 1
  const lowerLeft = longitude + 1 + (90 - (latitude - 1)) * 360
  const lowerRight = lowerLeft + 1


  const coordinates = {
    upperLeft,
    upperRight,
    lowerLeft,
    lowerRight
  }

  console.log(longitude, latitude, coordinates);
  return coordinates
}

async function isNeighbourhood () {
  const numberOfMutualPoints = await cryptoService.checkNumberOfMutualPoints()
  console.log(`Number of mutual points: ${numberOfMutualPoints}`)
  return numberOfMutualPoints > 0
}

export default { computeCoordinates, isNeighbourhood }
