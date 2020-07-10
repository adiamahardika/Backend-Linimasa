const express = require("express");
const Route = express.Router();

const { insertNews, readNews } = require("../controllers/news");
const uploadImages = require("../controllers/images");
Route
    .post("/", uploadImages, insertNews)
    .get("/", readNews)
    .get("/:news_id", readNews)
module.exports = Route;
