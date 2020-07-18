const express = require("express");
const Route = express.Router();

const {
  insertJobVacancyCategory,
  readJobVacancyCategory,
  updateJobVacancyCategory,
} = require("../controllers/job_vacancy_category");

Route.post("/", insertJobVacancyCategory)
  .get("/", readJobVacancyCategory)
  .patch("/:job_vacancy_category_id", updateJobVacancyCategory);
module.exports = Route;
