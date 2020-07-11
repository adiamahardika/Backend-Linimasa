const express = require('express')

const Route = express.Router()

const { insertUserRole, readUserRole, updateUserRole, deleteUserRole } = require('../controllers/user_role')


Route
.post("/", insertUserRole)
.get("/", readUserRole)
.patch("/:user_role_id", updateUserRole)
.delete("/:user_role_id", deleteUserRole)
module.exports = Route