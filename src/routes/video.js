const express = require("express");
const Route = express.Router();

const {
  insertVideo,
  readVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/video");
const { uploadVideo } = require("../controllers/upload");

Route.post("/", uploadVideo, insertVideo)
  .get("/", readVideo)
  .get("/:video_id", readVideo)
  .patch("/:video_id", uploadVideo, updateVideo)
  .delete("/:video_id", deleteVideo);
module.exports = Route;
