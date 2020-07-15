const express = require("express");
const Route = express.Router();
const newsRouter = require("./news");
const newsCategoryRouter = require("./news_category");
const userRole = require("./user_role");
const user = require("./user");
const commentar = require("./commentar");
const ads = require("./ads")
const videoCategory = require("./video_category")
Route
  .use("/news", newsRouter)
  .use("/assets/upload/images", express.static("./assets/upload/images"))
  .use("/news-category", newsCategoryRouter)
  .use("/user-role", userRole)
  .use("/user", user)
  .use("/commentar", commentar)
  .use("/ads", ads)
  .use("/video-category", videoCategory)
module.exports = Route;
