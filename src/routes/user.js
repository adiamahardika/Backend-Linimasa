const express = require("express");
const Route = express.Router();

const {
  register,
  login,
  token,
  readUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const { uploadProfileImages } = require("../controllers/upload");

Route
  .post("/register", uploadProfileImages, register)
  .post("/login", login)
  .post("/token", token)
  .get("/", readUser)
  .get("/:user_id", readUser)
  .patch("/:user_id", uploadProfileImages, updateUser)
  .delete("/:user_id", deleteUser);
module.exports = Route;