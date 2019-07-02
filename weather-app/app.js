const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const location = process.argv[2]

if (location) {
  geocode(location, (error, loc) => {
    if (error) {
      return console.log(error.message)
    }
    forecast(loc.longitude, loc.latitude, (error, forecast) => {
      if (error) {
        return console.log(error.message)
      }
      console.log(
        JSON.stringify({
          location: loc.name,
          summary: `${forecast.summary} ${forecast.temp}`,
          percipitation: forecast.percip,
        })
      )
    })
  })
} else {
  console.log("USAGE: node app.js 'City Name'")
}
