const express = require("express");
const Route = express.Router();
const {
  insertJobVacancy,
  readJobVacancy,
  updateJobVacancy,
  deleteJobVacancy
} = require("../controllers/job_vacancy");

Route.post("/", insertJobVacancy)
.get("/", readJobVacancy)
.get("/:job_vacancy_id", readJobVacancy)
.patch("/:job_vacancy_id", updateJobVacancy)
.delete("/:job_vacancy_id", deleteJobVacancy)
module.exports = Route;
