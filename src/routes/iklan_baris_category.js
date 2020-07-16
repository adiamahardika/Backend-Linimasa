const express = require("express");
const Route = express.Router();
const {
  insertIklanBarisCategory,
} = require("../controllers/iklan_baris_category");

Route
.post("/", insertIklanBarisCategory);
module.exports = Route;
