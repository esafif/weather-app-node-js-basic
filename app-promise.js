const yargs = require("yargs");
const axios = require("axios");

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch for',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

var encodeAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === "ZERO_RESULT"){
        throw new Error('Unable to find that address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/d879b27f7328e734c6ab5533e036bc06/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's Currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((e) => {
    if(e.code === "ENotFound"){
        console.log('Tidak bisa connect ke API');
    }else{
        console.log(e.message);
    }
});