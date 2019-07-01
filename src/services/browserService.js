function getPositionSuccess(position) {

  const coordinates = position.coords;
  alert(`
    lat: ${coordinates.latitude}
    long: ${coordinates.longitude}
  `)
}

function getErrorMessage(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      return "User denied the request for Geolocation.";
    case error.POSITION_UNAVAILABLE:
      return "Location information is unavailable.";
    case error.TIMEOUT:
      return "The request to get user location timed out.";
    case error.UNKNOWN_ERROR:
      return "An unknown error occurred.";
  }
}

const getPositionOptions = {
  enableHighAccuracy: true, // false does not work
  timeout: 2000,
  maximumAge: 0
};

/**
 * Function to get current location using Geolocation API.
 *
 * Returns:
 *  Promise that resolves to { longitude, lattitude }.
 *
 * Raises:
 *  Error with rejection reason if Gelocation API failed to fetch location.
 */
async function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(coords),
      (error) => { reject(getErrorMessage(error)) },
      getPositionOptions);
  }, 2500);
}

export default { getLocation }
