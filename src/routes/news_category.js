const express = require('express')

const Route = express.Router()

const {insertNewsCategory, readNewsCategory, updateNewsCategory} = require('../controllers/news_category')

Route
    .post("/", insertNewsCategory)
    .get("/", readNewsCategory)
    .patch("/:category_id", updateNewsCategory)
module.exports = Route