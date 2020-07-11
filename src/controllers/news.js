const newsModel = require("../models/news");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip } = require("../configs");

module.exports = {
  insertNews: async (request, response) => {
    try {
      const id = Date.now() + uniqid.process();
      const data = {
        id,
        news_title: request.body.news_title,
        news_content: request.body.news_content,
        news_image: `http://${ip}/assets/upload/images/news/${request.file.filename}`,
        news_image_description: request.body.news_image_description,
        news_category: request.body.news_category,
        news_author: request.body.news_author,
        date_created: new Date(),
        date_updated: new Date(),
      };
      console.log(data)
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
      const result = await newsModel.readNews(
        news_id,
        search_title,
        search_category
      );
      miscHelper.customResponse(response, 200, result);
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
        const data = {
          news_title: request.body.news_title,
          news_image: `http://${ip}/assets/upload/images/${request.file.filename}`,
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
      const result = await newsModel.deleteNews(news_id);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot delete news!");
    }
  },
};
