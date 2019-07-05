console.log('app.js loaded')

fetch('/weather?address=boston').then(res => {
  res.json().then(({ error, address, forecast, location } = {}) => {
    if (error) {
      return console.log(error)
    }
    console.log(`${location}: ${forecast}`)
  })
})
