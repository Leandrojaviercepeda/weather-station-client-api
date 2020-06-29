const express = require('express')
const StationRouter =  express.Router()

const { getStationdataBetweenDates,
        getStationdataById,
        getStationdataByPlace,
        getStationdataByGeolocation,
        getStationdataByZipcode
    } = require('../db/finaluser')

const { getClientAsociatedWith,
        saveInQueryHistory
    } = require('../db/client')

// Router for get data by between dates of creation
StationRouter.get('/stations/createdAt?', async (req, res, next) => {
    try {
        const reqStartDate = req.query.startdate
        const reqEndDate = req.query.enddate
        const reqLimit = req.query.limit

        if (reqStartDate && reqEndDate) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)            
            const saved = await saveInQueryHistory(client)            
            const stations = await getStationdataBetweenDates(reqStartDate, reqEndDate, reqLimit)

            res.status(200).send(JSON.stringify(stations, null, 2))
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
StationRouter.get('/stations/locatedAt?', async (req, res, next) => {
    try {
        const reqLatitude = req.query.latitude
        const reqLongitude = req.query.longitude

        if (reqLatitude && reqLongitude) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)            
            const saved = await saveInQueryHistory(client)
            const station = await getStationdataByGeolocation(reqLatitude, reqLongitude)

            res.status(200).send(JSON.stringify(station, null, 2))
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
StationRouter.get('/stations/locatedAt?', async (req, res, next) => {
    try {
        const reqRegion = req.query.region
        const reqCity = req.query.city
        const reqLimit = req.query.limit

        if (reqRegion && reqCity) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)            
            const saved = await saveInQueryHistory(client)
            const stations = await getStationdataByPlace(reqRegion, reqCity, reqLimit)

            res.status(200).send(JSON.stringify(stations, null, 2))
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
StationRouter.get('/stations/locatedAt?', async (req, res, next) => {
    try {
        const reqZipcode = req.query.zipcode
        const reqLimit = req.query.limit

        if (reqZipcode) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)            
            const saved = await saveInQueryHistory(client)
            const stations = await getStationdataByZipcode(reqZipcode, reqLimit)

            res.status(200).send(JSON.stringify(stations, null, 2))
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
StationRouter.get('/stations/', async (req, res, next) => {
    try {
        const reqIdStation = req.query.id

        if (reqIdStation) {
            const reqApikey = req.query.apikey
            const { client } = await getClientAsociatedWith(reqApikey)            
            const saved = await saveInQueryHistory(client)
            const station = await getStationdataById(reqIdStation)

            res.status(200).send(JSON.stringify(station, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})


module.exports = { StationRouter }