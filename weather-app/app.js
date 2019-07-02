const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const location = process.argv[2]

if (location) {
  geocode(location, (error, { latitude, longitude, name }) => {
    if (error) {
      return console.log(error.message)
    }
    forecast(longitude, latitude, (error, { summary, temp, percip }) => {
      if (error) {
        return console.log(error.message)
      }
      console.log(
        JSON.stringify({
          location,
          summary: `${summary} ${temp}`,
          percipitation: percip,
        })
      )
    })
  })
} else {
  console.log("USAGE: node app.js 'City Name'")
}
