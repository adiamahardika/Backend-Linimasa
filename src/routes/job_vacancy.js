const express = require("express");
const Route = express.Router();
const {
  insertJobVacancy,
  readJobVacancy,
} = require("../controllers/job_vacancy");

Route.post("/", insertJobVacancy)
.get("/", readJobVacancy)
.get("/:job_vacancy_id", readJobVacancy)
module.exports = Route;
