const express = require('express')
const Route = express.Router()
const newsRouter = require('./news')
const newsCategoryRouter = require('./news_category')
Route
    .use('/news', newsRouter)
    .use('/assets/upload/images', express.static('./assets/upload/images'))
    .use('/newsCategory', newsCategoryRouter)
module.exports = Route