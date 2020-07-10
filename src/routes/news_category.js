const express = require('express')

const Route = express.Router()

const {insertNewsCategory, readNewsCategory} = require('../controllers/news_category')

Route
    .post("/", insertNewsCategory)
    .get("/", readNewsCategory)
module.exports = Route