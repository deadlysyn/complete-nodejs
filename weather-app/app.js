const request = require('request')
const geocode = require('./util/geocode')
const weather = require('./util/forecast')

// geocode('Lexington Kentucky', (error, data) => {
//   if (error) {
//     console.log(error.message)
//   } else {
//     console.log({
//       longitutde: data.longitude,
//       latitude: data.latitude,
//       name: data.name,
//     })
//   }
// })

const longitutde = '-84.497'
const latitude = '38.0464'
weather(longitutde, latitude, (error, data) => {
  if (error) {
    console.log(error.message)
  } else {
    console.log(data)
  }
})
