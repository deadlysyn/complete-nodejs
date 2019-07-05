const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const app = express()

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

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
    name: 'WeatherBot',
    helpText: 'help text goes here',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'no address provided',
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({
        error: error.message,
      })
    }
    forecast(longitude, latitude, (error, { summary, temp, percip }) => {
      if (error) {
        return res.send({
          error: error.message,
        })
      }
      res.send({
        forecast: `${summary} ${temp} ${percip}`,
        location,
        address: req.query.address,
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'no search term',
    })
  }
  console.log(req.query.search)
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'WeatherBot',
    errorMessage: 'help article not found',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'WeatherBot',
    errorMessage: 'page not found',
  })
})

app.listen(3000, () => {
  console.log('started localhost:3001')
})
