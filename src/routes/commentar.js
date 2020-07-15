const express = require("express");
const Route = express.Router();

const { insertCommentar, readCommentar, updateCommentar, deleteCommentar } = require("../controllers/commentar");

Route
    .post("/", insertCommentar)
    .get("/", readCommentar)
    .get("/:commentar_id", readCommentar)
    .patch("/:commentar_id", updateCommentar)
    .delete("/:commentar_id", deleteCommentar)
module.exports = Route;
