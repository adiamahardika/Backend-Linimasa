const express = require("express");
const Route = express.Router();
const {
  insertIklanBarisCategory,
  readIklanBarisCategory,
  updateIklanBarisCategory,
  deleteIklanBarisCategory,
} = require("../controllers/iklan_baris_category");

Route.post("/", insertIklanBarisCategory)
  .get("/", readIklanBarisCategory)
  .patch("/:iklan_baris_category_id", updateIklanBarisCategory)
  .delete("/:iklan_baris_category_id", deleteIklanBarisCategory);
module.exports = Route;
