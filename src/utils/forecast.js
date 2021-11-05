const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d0a2d696397352ecc075ae342fdb6d49&query='+ latitude +','+ longitude +'&units=f'

    request({ url, json: true}, (error, { body }) => {

        if(error) {
            callback('Unable to connect to weather service', undefined)
        }
        else if(body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            const conditions = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const humidity = body.current.humidity
            const windSpeed = body.current.wind_speed
            const windDir = body.current.wind_dir

            const data = 'It is ' + conditions + '. It is currently ' + temperature + ' degrees out, it feels like ' + feelslike + ' degrees. Current humidity is ' + humidity + '%. Wind Speeds are currently ' + windSpeed + ' MPH coming from the '+ windDir + '.'
            callback(undefined, data)
        }

    })
}

module.exports = forecast