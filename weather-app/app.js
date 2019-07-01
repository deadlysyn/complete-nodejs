const request = require('request')
const geocode = require('./util/geocode')

const weatherToken = process.env.WEATHER_TOKEN
const weatherEndpoint = 'https://api.darksky.net/forecast/'
// const weatherURL = `${weatherEndpoint}${weatherToken}/${logitutde},${latitude}`
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

geocode('Lexington Kentucky', (error, data) => {
  if (error) {
    console.log(error.message)
  } else {
    console.log({
      longitutde: data.longitude,
      latitude: data.latitude,
      name: data.name,
    })
  }
})
