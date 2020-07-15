const express = require("express")

const Route = express.Router()

const {insertVideoCategory, readVideoCategory, updateVideoCategory} = require("../controllers/video_category")

Route
.post("/", insertVideoCategory)
.get("/", readVideoCategory)
.patch("/:video_category_id", updateVideoCategory)
module.exports = Route