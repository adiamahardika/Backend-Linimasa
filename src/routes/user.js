const express = require('express')
const Route = express.Router()

const { register, login, token } = require("../controllers/user")

const {uploadProfileImages} = require("../controllers/images")

Route
.post('/register',uploadProfileImages, register)
.post('/login', login)
.post('/token', token)
module.exports = Route