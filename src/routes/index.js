const express = require("express");
const Route = express.Router();
const newsRouter = require("./news");
const newsCategoryRouter = require("./news_category");
const userRole = require("./user_role")
Route.use("/news", newsRouter)
  .use("/assets/upload/images", express.static("./assets/upload/images"))
  .use("/news-category", newsCategoryRouter)
  .use("/user-role", userRole)
module.exports = Route;