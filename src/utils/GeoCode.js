const request = require('request');

const geocode = (address, callback) => {
    const url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWgtZWxtZW5hbiIsImEiOiJjanZzN255amEwZGV1NDNta2gyOXN1azMyIn0.PbeyXniK4YMSOVvXmwmGNQ`;
    
    request({ url: url2, json: true}, (error, {body} = {}) => {
       
            if(error)
                    callback('unable to access GeoCode API', undefined);
            else if (body.features.length === 0)
                    callback('unable to find location', undefined);
            else {
            const {center, place_name} = body.features[0];
            const {[0]:long, [1]:lat} = center
                    callback(undefined, {
                            long,
                            lat,
                            place_name,
                    })
            }
    })


}

module.exports = geocode;
