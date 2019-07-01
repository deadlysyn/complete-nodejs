const request = require('request')

const weatherEndpoint = 'https://api.darksky.net/forecast/'
const weatherToken = process.env.WEATHER_TOKEN

const forecast = (longitutde, latitude, callback) => {
  const weatherURL = `${weatherEndpoint}${weatherToken}/${longitutde},${latitude}`
  console.log(weatherURL)
  request({ url: weatherURL, json: true }, (error, response, body) => {
    if (error) {
      callback(Error('Unable to connect to weather service.'))
    } else if (body.error) {
      callback(Error('Unable to find location.'))
    } else {
      callback(undefined, {
        summary: `${body.daily.data[0].summary}`,
        temp: `It is currently ${body.currently.temperature} degress out.`,
        percip: `There is a ${body.currently.precipProbability}% chance of rain.`,
      })
    }
  })
}

module.exports = forecast
