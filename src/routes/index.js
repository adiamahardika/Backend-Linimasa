const express = require('express')
const Route = express.Router()
const newsRouter = require('./news')

Route
.use('/news', newsRouter)
module.exports = Route