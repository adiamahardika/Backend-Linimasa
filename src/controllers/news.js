const newsModel = require("../models/news");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip } = require("../configs");
const filesystem = require("fs").promises;

const deleteFile = async (news_id) => {
  const checkId = await newsModel.checkId(news_id);
  const dataNews = checkId[0];
  const path = dataNews.news_image.replace(
    `http://${ip}`,
    `../backend_lensajabar`
  );
  await filesystem.unlink(path);
};
module.exports = {
  insertNews: async (request, response) => {
    try {
      const news_title = request.body.news_title;
      const id =
        news_title
          .toLowerCase()
          .replace(/[^a-zA-Z0-9- ]/g, "")
          .split(" ")
          .join("-") +
        "-" +
        uniqid.process();
      const data = {
        id,
        news_title,
        news_content: request.body.news_content,
        news_image: `http://${ip}/assets/upload/images/news/${request.file.filename}`,
        news_image_description: request.body.news_image_description,
        news_category: request.body.news_category,
        news_author: request.body.news_author,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await newsModel.insertNews(data);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot insert news!");
    }
  },
  readNews: async (request, response) => {
    try {
      const news_id = request.params.news_id || null;
      const search_title = request.query.news_title || "";
      const search_category = request.query.news_category || "";
      const sort_by = request.query.sort_by || "date_updated";
      const order_by = request.query.order_by || "DESC";
      const total_data = await newsModel.countNews(search_title,
        search_category,
        sort_by,
        order_by)
      const page = parseInt(request.query.page) || 1
      const limit = parseInt(request.query.limit) || 5
      const start_index = (page - 1) * limit
      const pagination = {
        total_data,
        page,
        limit,
        start_index
      }
      const result = await newsModel.readNews(
        news_id,
        search_title,
        search_category,
        sort_by,
        order_by,
        start_index,
        limit
      );
      miscHelper.customResponsePagination(response, 200, result, pagination);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot read any news!");
    }
  },
  updateNews: async (request, response) => {
    try {
      const news_id = request.params.news_id;
      if (!request.file || Object.keys(request.file).length === 0) {
        const data = {
          news_title: request.body.news_title,
          news_content: request.body.news_content,
          news_image_description: request.body.news_image_description,
          news_category: request.body.news_category,
          news_author: request.body.news_author,
          date_updated: new Date(),
        };
        const result = await newsModel.updateNews(data, news_id);
        miscHelper.customResponse(response, 200, result);
      } else {
        await deleteFile(news_id);
        const data = {
          news_title: request.body.news_title,
          news_image: `http://${ip}/assets/upload/images/news/${request.file.filename}`,
          news_content: request.body.news_content,
          news_image_description: request.body.news_image_description,
          news_category: request.body.news_category,
          news_author: request.body.news_author,
          date_updated: new Date(),
        };
        const result = await newsModel.updateNews(data, news_id);
        miscHelper.customResponse(response, 200, result);
      }
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot update news!");
    }
  },
  deleteNews: async (request, response) => {
    try {
      const news_id = request.params.news_id;
      await deleteFile(news_id);
      const result = await newsModel.deleteNews(news_id);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot delete news!");
    }
  },
};
