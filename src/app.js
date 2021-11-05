const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Henry Newsum'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Henry Newsum'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Henry Newsum',
        message: 'Welcome to the help page, what can we help you with?'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please enter an address or location'
        })
    }
    const address = req.query.address
    geocode(address, (error, { location, latitude, longitude } = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            return res.send({
                location,
                forecastData,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404errors', {
        title: '404 not found',
        name: 'Henry Newsum',
        errorMessage: 'Help article not found' 
    })
})

app.get('*', (req, res) => {
    res.render('404errors', {
        title: '404 not found',
        name: 'Henry Newsum',
        errorMessage: 'Page not found' 
    })
})

//Server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})