const express = require("express");
const Route = express.Router();

const {
  insertJobVacancyCategory,
  readJobVacancyCategory,
  updateJobVacancyCategory,
  deleteJobVacancyCategory,
} = require("../controllers/job_vacancy_category");

Route.post("/", insertJobVacancyCategory)
  .get("/", readJobVacancyCategory)
  .patch("/:job_vacancy_category_id", updateJobVacancyCategory)
  .delete("/:job_vacancy_category_id", deleteJobVacancyCategory);
module.exports = Route;
