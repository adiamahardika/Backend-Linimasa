const express = require('express')
const Route = express.Router()
const newsRouter = require('./news')

Route
    .use('/news', newsRouter)
    .use('/assets/upload/images', express.static('./assets/upload/images'))
module.exports = Route