const express = require("express");
const Route = express.Router();
const newsRouter = require("./news");
const newsCategoryRouter = require("./news_category");
const userRole = require("./user_role")
const user = require("./user")
Route.use("/news", newsRouter)
  .use("/assets/upload/images", express.static("./assets/upload/images"))
  .use("/news-category", newsCategoryRouter)
  .use("/user-role", userRole)
  .use("/user", user)
module.exports = Route;
