const express = require("express");
const Route = express.Router();
const {
  insertIklanBarisCategory, readIklanBarisCategory
} = require("../controllers/iklan_baris_category");

Route
.post("/", insertIklanBarisCategory)
.get("/", readIklanBarisCategory)
module.exports = Route;
