const express = require('express')

const app = express()

app.get('', (req, res) => {
  res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
  res.send({
    name: 'me',
    age: 42,
  })
})

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>')
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'the weather is nice.',
    location: 'somewhere',
  })
})

app.listen(3000, () => {
  console.log('started localhost:3001')
})
