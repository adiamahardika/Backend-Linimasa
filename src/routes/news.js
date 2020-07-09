const express = require('express')
const Route = express.Router()

const { insertNews } = require('../controllers/news')
const uploadImages  = require('../controllers/images')
Route
.post('/', uploadImages, insertNews)

module.exports = Route