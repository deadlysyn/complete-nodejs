const request = require('request')

const weatherEndpoint = 'https://api.darksky.net/forecast/'
const weatherToken = process.env.WEATHER_TOKEN

const forecast = (longitude, latitude, callback) => {
  const url = `${weatherEndpoint}${weatherToken}/${longitude},${latitude}`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(Error('Unable to connect to weather service.'))
    } else if (body.error) {
      callback(Error('Unable to find location.'))
    } else {
      console.log(url)
      callback(undefined, {
        summary: `${body.daily.data[0].summary}`,
        temp: `It is currently ${body.currently.temperature} degress out.`,
        percip: `${body.currently.humidity * 100}% humidity with a ${
          body.currently.precipProbability
        }% chance of rain.`,
      })
    }
  })
}

module.exports = forecast
