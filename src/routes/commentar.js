const express = require("express");

const Route = express.Router();

const { insertCommentar, readCommentar } = require("../controllers/commentar");

Route
    .post("/", insertCommentar)
    .get("/", readCommentar)
    .get("/:commentar_id", readCommentar)
module.exports = Route;
