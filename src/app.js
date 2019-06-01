const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/GeoCode')
const forcast = require('./utils/forcast')
const port = process.env.PORT || 3000
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handelebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);


// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Ahmed El Menan'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me',
        name : 'Ahmed El Menan'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        message : 'RTM',
        name : 'Ahmed El Menan'
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
       title : 'ERROR 404',
        message : 'Help article not found',
        name : 'Ahmed El Menan'
    })
})


// app.get('/help', (req, res) => {
//     res.send('Help page');
// })
// app.get('/about', (req, res) => {
//     res.send('<h1>About us</h1>');
// })
app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({error:'address not found'});
        const address = req.query.address
         geocode(address, (error, {lat, long, place_name } = {}) => {
                            if (error)
                            return res.send({error});

                            forcast(lat, long, (error, forcastData) => {
                                if (error)
                                    return res.send({error});
                                return res.send({ 
                                    forcast : forcastData,
                                    location : place_name, 
                                    address,
                                })
                        })
                })
    });

app.get('*', (req, res) => {
    res.render('error',{
        title : 'ERROR 404',
        message : 'Page not found',
        name : 'Ahmed El Menan'
    })
})
app.listen(port, () => {
    console.log('Server is up on port' + port);
})
