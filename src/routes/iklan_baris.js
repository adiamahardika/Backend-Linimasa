const express = require("express");
const Route = express.Router();
const {
  insertIklanBaris,
  readIklanBaris,
  updateIklanBaris,
  deleteIklanBaris
} = require("../controllers/iklan_baris");
const { uploadIklanBarisImages } = require("../controllers/upload");

Route.post("/", uploadIklanBarisImages, insertIklanBaris)
  .get("/", readIklanBaris)
  .get("/:iklan_baris_id", readIklanBaris)
  .patch("/:iklan_baris_id",uploadIklanBarisImages,  updateIklanBaris)
  .delete("/:iklan_baris_id", deleteIklanBaris)
module.exports = Route;
