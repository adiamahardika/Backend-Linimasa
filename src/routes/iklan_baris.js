const express = require("express");
const Route = express.Router();
const { insertIklanBaris } = require("../controllers/iklan_baris");
const { uploadIklanBarisImages } = require("../controllers/upload");

Route.post("/", uploadIklanBarisImages, insertIklanBaris);
module.exports = Route;
