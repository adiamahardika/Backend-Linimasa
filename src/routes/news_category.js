const express = require('express')

const Route = express.Router()

const {insertNewsCategory} = require('../controllers/news_category')

Route
    .post("/", insertNewsCategory)
module.exports = Route