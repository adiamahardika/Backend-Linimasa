const express = require("express")
const Route = express.Router()

const {insertVideo} = require("../controllers/video")
const {uploadVideo} = require("../controllers/upload")

Route
.post("/", uploadVideo, insertVideo)
module.exports = Route