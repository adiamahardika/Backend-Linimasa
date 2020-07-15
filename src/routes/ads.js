const express = require("express");
const Route = express.Router();

const { insertAds, readAds, updateAds } = require("../controllers/ads")
const {uploadAdsImages} = require("../controllers/images")
Route
    .post("/", uploadAdsImages, insertAds)
    .get("/", readAds)
    .get("/:ads_id", readAds)
    .patch("/:ads_id", uploadAdsImages, updateAds)
module.exports = Route
