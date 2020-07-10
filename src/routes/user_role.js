const express = require('express')

const Route = express.Router()

const { insertUserRole } = require('../controllers/user_role')

Route
.post("/", insertUserRole)
module.exports = Route