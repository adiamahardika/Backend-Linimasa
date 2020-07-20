const jobVacancyModel = require("../models/job_vacancy");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip } = require("../configs");
const { response } = require("express");
const fileSystem = require("fs").promises;

module.exports = {
  insertJobVacancy: async (request, response) => {
    try {
      const job_vacancy_title = request.body.job_vacancy_title;
      const job_vacancy_company = request.body.job_vacancy_company;
      const id =
        (job_vacancy_title + "-" + job_vacancy_company)
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
  readJobVacancy: async (request, response) => {
    try {
      const job_vacancy_id = request.params.job_vacancy_id || null;
      const search_title = request.query.job_vacancy_title || "";
      const search_category = request.query.job_vacancy_category || "";
      const search_city = request.query.job_vacancy_city || "";
      const sort_by = request.query.sort_by || "date_updated";
      const order_by = request.query.order_by || "DESC";
      const total_data = await jobVacancyModel.countJobVacancy(
        job_vacancy_id,
        search_title,
        search_category,
        search_city,
        sort_by,
        order_by
      );
      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 4;
      const start_index = (page - 1) * limit;
      const pagination = {
        total_data,
        page,
        limit,
        start_index,
      };
      const result = await jobVacancyModel.readJobVacancy(
        job_vacancy_id,
        search_title,
        search_category,
        search_city,
        sort_by,
        order_by,
        start_index,
        limit
      );
      miscHelper.customResponsePagination(response, 200, result, pagination);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot read any job vacancy!"
      );
    }
  },
  updateJobVacancy: async (request, response) => {
    try {
      const job_vacancy_id = request.params.job_vacancy_id;
      const data = {
        job_vacancy_title: request.body.job_vacancy_title,
        job_vacancy_company: request.body.job_vacancy_company,
        job_vacancy_location: request.body.job_vacancy_location,
        job_vacancy_salary_start: request.body.job_vacancy_salary_start,
        job_vacancy_salary_end: request.body.job_vacancy_salary_end,
        job_vacancy_category: request.body.job_vacancy_category,
        job_vacancy_jobdesk: request.body.job_vacancy_jobdesk,
        job_vacancy_requirements: request.body.job_vacancy_requirements,
        job_vacancy_deadline: request.body.job_vacancy_deadline,
        job_vacancy_city: request.body.job_vacancy_city,
        job_vacancy_author: request.body.job_vacancy_author,
        date_updated: new Date(),
      };
      const result = await jobVacancyModel.updateJobVacancy(
        data,
        job_vacancy_id
      );
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot update job vacancy!"
      );
    }
  },
  deleteJobVacancy: async (request, response) => {
    try {
      const job_vacancy_id = request.params.job_vacancy_id;
      const result = await jobVacancyModel.deleteJobVacancy(job_vacancy_id);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot delete job vacancy!"
      );
    }
  },
};
