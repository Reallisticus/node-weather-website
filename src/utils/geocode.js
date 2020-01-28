const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmVhbGxpc3QiLCJhIjoiY2s1dDNxaXo3MDF0NzNtb3poYWlpMjQ5aSJ9.VIxyCqfF1-ia6i2tKCzxyQ'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geolocation services.', undefined)
        } else if (body.features.length === 0) {
            callback('Location not found', undefined)
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const locName = body.features[0].place_name;

            callback(undefined, {
                latitude,
                longitude,
                locName
            });

        }
    })
}

module.exports = geocode;