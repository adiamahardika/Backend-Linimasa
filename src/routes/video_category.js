const express = require("express");

const Route = express.Router();

const {
  insertVideoCategory,
  readVideoCategory,
  updateVideoCategory,
  deleteVideoCategory,
} = require("../controllers/video_category");

Route.post("/", insertVideoCategory)
  .get("/", readVideoCategory)
  .patch("/:video_category_id", updateVideoCategory)
  .delete("/:video_category_id", deleteVideoCategory);
module.exports = Route;
