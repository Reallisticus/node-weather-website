const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Express paths
const staticPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const prtlsPath = path.join(__dirname, '../templates/partials')

// Handlebars config/views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(prtlsPath);

// Setup static directory
app.use(express.static(staticPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Nikolas Jmakin'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nikolas Jmakin',
        img: '/img/about.jpg'
    });
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nikolas Jmakin'
    });
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    
    const location = req.query.address
    geocode(location, (error, { latitude, longitude, locName } = {}) => {
        if (error) {
            return res.send({
                error
            })
        } else {
            forecast(latitude, longitude, (error, _data) => {
                if (error) {
                    return res.send({
                        error
                    })
                } else {
                    return res.send({
                        location: locName,
                        forecast: _data
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up')
});