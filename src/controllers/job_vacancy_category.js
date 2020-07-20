const jobVacancyCategoryModel = require("../models/job_vacancy_category");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");

module.exports = {
  insertJobVacancyCategory: async (request, response) => {
    try {
      const id = uniqid.time();
      const data = {
        id,
        job_vacancy_category_name: request.body.job_vacancy_category_name,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await jobVacancyCategoryModel.insertJobVacancyCategory(
        data
      );
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot insert job vacancy category!"
      );
    }
  },
  readJobVacancyCategory: async (request, response) => {
    try {
      const search_job_vacancy_category_name =
        request.query.job_vacancy_category_name || "";
      const result = await jobVacancyCategoryModel.readJobVacancyCategory(
        search_job_vacancy_category_name
      );
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot read any job vacancy category!"
      );
    }
  },
  updateJobVacancyCategory: async (request, response) => {
    try {
      const job_vacancy_category_id = request.params.job_vacancy_category_id;
      const data = {
        job_vacancy_category_name: request.body.job_vacancy_category_name,
        date_updated: new Date(),
      };
      const result = await jobVacancyCategoryModel.updateJobVacancyCategory(
        data,
        job_vacancy_category_id
      );
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot update job vacancy category!"
      );
    }
  },
  deleteJobVacancyCategory: async (request, response) => {
    try {
      const job_vacancy_category_id = request.params.job_vacancy_category_id;
      const result = await jobVacancyCategoryModel.deleteJobVacancyCategory(
        job_vacancy_category_id
      );
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot delete job vacancy category!"
      );
    }
  },
};
