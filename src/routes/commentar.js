const express = require("express")

const Route = express.Router()

const {insertCommentar} = require("../controllers/commentar")

Route
.post("/", insertCommentar)
module.exports = Route