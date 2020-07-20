const jobVacancyModel = require("../models/job_vacancy");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip } = require("../configs");
const fileSystem = require("fs").promises;

module.exports = {
  insertJobVacancy: async (request, response) => {
    try {
      const job_vacancy_title = request.body.job_vacancy_title;
      const job_vacancy_company = request.body.job_vacancy_company;
      const id =
        (job_vacancy_title + "-" +
        job_vacancy_company)
          .toLowerCase()
          .replace(/[^a-zA-Z0-9- ]/g, "")
          .split(" ")
          .join("-") +
        "-" +
        uniqid.process();
      const data = {
        id,
        job_vacancy_title,
        job_vacancy_company,
        job_vacancy_location: request.body.job_vacancy_location,
        job_vacancy_salary_start: request.body.job_vacancy_salary_start,
        job_vacancy_salary_end: request.body.job_vacancy_salary_end,
        job_vacancy_category: request.body.job_vacancy_category,
        job_vacancy_jobdesk: request.body.job_vacancy_jobdesk,
        job_vacancy_requirements: request.body.job_vacancy_requirements,
        job_vacancy_deadline: request.body.job_vacancy_deadline,
        job_vacancy_city: request.body.job_vacancy_city,
        job_vacancy_author: request.body.job_vacancy_author,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await jobVacancyModel.insertJobVacancy(data);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot insert job vacancy!"
      );
    }
  },
};
