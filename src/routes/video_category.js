const express = require("express")

const Route = express.Router()

const {insertVideoCategory, readVideoCategory} = require("../controllers/video_category")

Route
.post("/", insertVideoCategory)
.get("/", readVideoCategory)
module.exports = Route