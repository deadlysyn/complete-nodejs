const request = require('request')

const mapEndpoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapOptions = '?limit=1&access_token='
const mapToken = process.env.MAP_TOKEN

const geocode = (address, callback) => {
  const mapLocation = `${encodeURIComponent(address)}.json`
  const mapURL = mapEndpoint + mapLocation + mapOptions + mapToken
  request({ url: mapURL, json: true }, (error, response, body) => {
    if (error) {
      callback(Error('Unable to reach mapping service.'))
    } else if (body.features.length === 0) {
      callback(Error('Unable to find location.'))
    } else {
      callback(undefined, {
        longitude: `${body.features[0].center[1]}`,
        latitude: `${body.features[0].center[0]}`,
        name: `${body.features[0].place_name}`,
      })
    }
  })
}

module.exports = geocode
