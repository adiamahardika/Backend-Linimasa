const express = require("express");
const Route = express.Router();
const {
  insertIklanBarisCategory,
  readIklanBarisCategory,
  updateIklanBarisCategory,
} = require("../controllers/iklan_baris_category");

Route
    .post("/", insertIklanBarisCategory)
  .get("/", readIklanBarisCategory)
  .patch("/:iklan_baris_category_id", updateIklanBarisCategory)
module.exports = Route;
