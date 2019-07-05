const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static content directory
app.use(express.static(publicPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'WeatherBot',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'WeatherBot',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    helpText: 'help text goes here',
    name: 'WeatherBot',
  })
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
