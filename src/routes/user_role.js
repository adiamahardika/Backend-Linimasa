const express = require('express')

const Route = express.Router()

const { insertUserRole, readUserRole } = require('../controllers/user_role')

Route
.post("/", insertUserRole)
.get("/", readUserRole)
module.exports = Route