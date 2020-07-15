const express = require("express");
const Route = express.Router();

const { insertAds} = require("../controllers/ads")
const {uploadAdsImages} = require("../controllers/images")
Route
.post("/", uploadAdsImages, insertAds)
module.exports = Route
