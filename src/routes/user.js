const express = require('express')
const Route = express.Router()

const { register } = require("../controllers/user")

const {uploadProfileImages} = require("../controllers/images")

Route
.post('/register',uploadProfileImages, register)
module.exports = Route