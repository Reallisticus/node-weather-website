const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/41467ca04e3251f0ca53511007c11b82/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si&lang=bg';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to access weather service.', undefined);
        } else if (body.error) {
            callback('Wrong coordinates.', undefined);
        } else {
            const temperature = body.currently.temperature
            const precipProbability = body.currently.precipProbability
            const dailySummary = body.daily.data[0].summary

            callback(undefined, dailySummary + '\nIt is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain');
        }
    })

}

module.exports = forecast;