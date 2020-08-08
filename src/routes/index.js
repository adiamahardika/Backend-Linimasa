const express = require("express");
const Route = express.Router();

const newsRouter = require("./news");
const newsCategoryRouter = require("./news_category");
const userRole = require("./user_role");
const user = require("./user");
const commentar = require("./commentar");
const ads = require("./ads");
const videoCategory = require("./video_category");
const video = require("./video");
const iklanBarisCategory = require("./iklan_baris_category");
const iklanBaris = require("./iklan_baris");
const jobVacancyCategory = require("./job_vacancy_category")
const jobVacancy = require("./job_vacancy")

Route.use("/assets/upload/images", express.static("./assets/upload/images"))
  .use("/assets/upload/videos", express.static("./assets/upload/videos"))
  .use("/news", newsRouter)
  .use("/news-category", newsCategoryRouter)
  .use("/user-role", userRole)
  .use("/user", user)
  .use("/commentar", commentar)
  .use("/ads", ads)
  .use("/video-category", videoCategory)
  .use("/video", video)
  .use("/iklan-baris-category", iklanBarisCategory)
  .use("/iklan-baris", iklanBaris)
  .use("/job-vacancy-category", jobVacancyCategory)
  .use("/job-vacancy", jobVacancy)
module.exports = Route;
