const express = require("express");
const Route = express.Router();

const { insertVideo, readVideo } = require("../controllers/video");
const { uploadVideo } = require("../controllers/upload");

Route.post("/", uploadVideo, insertVideo)
  .get("/", readVideo)
  .get("/:video_id", readVideo);
module.exports = Route;
