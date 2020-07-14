const express = require("express");

const Route = express.Router();

const {
  insertNewsCategory,
  readNewsCategory,
  updateNewsCategory,
  deleteNewsCategory,
} = require("../controllers/news_category");

Route
  .post("/", insertNewsCategory)
  .get("/", readNewsCategory)
  .patch("/:category_id", updateNewsCategory)
  .delete("/:category_id", deleteNewsCategory);
module.exports = Route;
