const express = require("express")

const Route = express.Router()

const {insertVideoCategory} = require("../controllers/video_category")

Route
.post("/", insertVideoCategory)
module.exports = Route