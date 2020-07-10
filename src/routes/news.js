const express = require("express");
const Route = express.Router();

const { insertNews, readNews, updateNews, deleteNews } = require("../controllers/news");
const uploadImages = require("../controllers/images");
Route
    .post("/", uploadImages, insertNews)
    .get("/", readNews)
    .get("/:news_id", readNews)
    .patch("/:news_id", uploadImages, updateNews)
    .delete("/:news_id", deleteNews)
module.exports = Route;
