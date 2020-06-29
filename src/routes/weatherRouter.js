const express = require('express')
const WeatherRouter =  express.Router()

const { getWeatherdataBetweenDates,
        getWeatherdataByStationId,
        getWeatherdataByPlace,
        getWeatherdataByGeolocation,
        getWeatherdataByZipcode
    } = require('../db/finaluser')

const { getClientAsociatedWith,
        saveInQueryHistory
    } = require('../db/client')


// Router for get data by station and between dates of measurements
WeatherRouter.get('/weather/measurements/betweenDates?', async (req, res, next) => {
    try {
        const reqStationId = req.query.id
        const reqStartDate = req.query.startdate
        const reqEndDate = req.query.enddate

        if (reqStationId && reqStartDate && reqEndDate) {
            const measurements = await getWeatherdataBetweenDates(reqStationId, reqStartDate, reqEndDate)

            res.status(200).send(JSON.stringify(measurements, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get data by place
WeatherRouter.get('/weather/measurements/onLocation?', async (req, res, next) => {
    try {
        const reqRegion = req.query.region
        const reqCity = req.query.city

        if (reqRegion && reqCity) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)            
            const saved = await saveInQueryHistory(client)
            const measurements = await getWeatherdataByPlace(reqRegion, reqCity)

            res.status(200).send(JSON.stringify(measurements, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get data by geolocation
WeatherRouter.get('/weather/measurements/onLocation?', async (req, res, next) => {
    try {
        const reqLatitude = req.query.latitude
        const reqLongitude = req.query.longitude

        if (reqLatitude && reqLongitude) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)            
            const saved = await saveInQueryHistory(client)
            const measurement = await getWeatherdataByGeolocation(reqLatitude, reqLongitude)

            res.status(200).send(JSON.stringify(measurement, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get data by zipcode
WeatherRouter.get('/weather/measurements/onLocation?', async (req, res, next) => {
    try {
        const reqZipcode = req.query.zipcode

        if (reqZipcode) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)            
            const saved = await saveInQueryHistory(client)
            const measurements = await getWeatherdataByZipcode(reqZipcode)

            res.status(200).send(JSON.stringify(measurements, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get data by id station
WeatherRouter.get('/weather/measurements/relevatedBy?', async (req, res, next) => {
    try {
        const reqIdStation = req.query.idstation

        if (reqIdStation) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)            
            const saved = await saveInQueryHistory(client)
            const measurement = await getWeatherdataByStationId(reqIdStation)

            res.status(200).send(JSON.stringify(measurement, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})


module.exports = { WeatherRouter }