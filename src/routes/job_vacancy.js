const express = require("express")
const Route = express.Router()
const {insertJobVacancy} = require("../controllers/job_vacancy")

Route.post("/", insertJobVacancy)
module.exports = Route