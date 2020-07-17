const express = require("express");
const Route = express.Router();
const {
  insertNews,
  readNews,
  updateNews,
  deleteNews,
} = require("../controllers/news");
const { uploadNewsImages } = require("../controllers/upload");

Route.post("/", uploadNewsImages, insertNews)
  .get("/", readNews)
  .get("/:news_id", readNews)
  .patch("/:news_id", uploadNewsImages, updateNews)
  .delete("/:news_id", deleteNews);
module.exports = Route;
