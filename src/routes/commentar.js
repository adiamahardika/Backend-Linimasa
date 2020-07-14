const express = require("express");

const Route = express.Router();

const { insertCommentar, readCommentar, updateCommentar } = require("../controllers/commentar");

Route
    .post("/", insertCommentar)
    .get("/", readCommentar)
    .get("/:commentar_id", readCommentar)
    .patch("/:commentar_id", updateCommentar)
module.exports = Route;
