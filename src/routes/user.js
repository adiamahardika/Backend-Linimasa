const express = require("express");
const Route = express.Router();

const { register, login, token, readUser } = require("../controllers/user");

const { uploadProfileImages } = require("../controllers/images");

Route
  .post("/register", uploadProfileImages, register)
  .post("/login", login)
  .post("/token", token)
  .get("/", readUser)
  .get("/:user_id", readUser)
module.exports = Route;
