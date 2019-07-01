const request = require('request')

// secrets should be read from ENV
// const weatherURL =
//   'https://api.darksky.net/forecast/2769c6397ac010f61c669bea6eb24518/37.129,-84.0833'
// request({ url: weatherURL, json: true }, (error, response, body) => {
//   if (error) {
//     console.log('ERROR: Unable to connect to weather service.')
//   } else if (body.error) {
//     console.log('ERROR: Unable to find location.')
//   } else {
//     console.log(
//       `${body.daily.data[0].summary} It is currently ${
//         body.currently.temperature
//       } degress out. There is a ${body.currently.precipProbability}% chance of rain.`
//     )
//   }
// })

// const mapToken =
//   'pk.eyJ1IjoibWhvc2tpbnM3OSIsImEiOiJjang0NXM0amUwNjc2M3ltcnplZmhidnBtIn0.wlobq8Mk1w97yF6wLDn9jQ'
// const mapEndpoint =
//   'https://api.mapbox.com/geocoding/v5/mapbox.places/London%20Kentucky.json?limit=1&access_token='
// const mapURL = mapEndpoint + mapToken

// request({ url: mapURL, json: true }, (error, response, body) => {
//   if (error) {
//     console.log('ERROR: Unable to reach mapping service.')
//   } else if (body.features.length === 0) {
//     console.log('ERROR: Unable to find location.')
//   } else {
//     const longitude = `${body.features[0].center[0]}`
//     const latitude = `${body.features[0].center[1]}`
//     console.log(`Long: ${latitude} Lat: ${longitude}`)
//   }
// })

const mapEndpoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapOptions = '?limit=1&access_token='
const mapToken = process.env.MAP_TOKEN

const geocode = (address, callback) => {
  const mapLocation = `${encodeURIComponent(address)}.json`
  const mapURL = mapEndpoint + mapLocation + mapOptions + mapToken
  request({ url: mapURL, json: true }, (error, response, body) => {
    if (error) {
      callback(Error('Unable to reach mapping service.'), undefined)
    } else if (body.features.length === 0) {
      callback(Error('Unable to find location.'), undefined)
    } else {
      callback(undefined, {
        longitude: `${body.features[0].center[0]}`,
        latitude: `${body.features[0].center[1]}`,
      })
    }
  })
}

geocode('Lexington Kentucky', (error, data) => console.log(data.longitude, data.latitude))
