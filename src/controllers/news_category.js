const categoryModel = require("../models/news_category");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");

module.exports = {
  insertNewsCategory: async (request, response) => {
    try {
      const news_category_name = request.body.news_category_name;
      const newsCategoryValid = await categoryModel.checkNewsCategoryName(
        news_category_name
      );
      const dataNewsCategory = newsCategoryValid[0];
      if (dataNewsCategory === undefined) {
        const id = uniqid.time();
        const data = {
          id,
          news_category_name,
          date_created: new Date(),
          date_updated: new Date(),
        };
        const result = await categoryModel.insertNewsCategory(data);
        miscHelper.customResponse(response, 200, result);
      } else {
        miscHelper.customErrorResponse(
          response,
          404,
          "This news category has already in database!"
        );
      }
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot insert news category!"
      );
    }
  },
  readNewsCategory: async (request, response) => {
    try {
      const search_news_category_name = request.query.news_category_name || "";
      const sort_by = request.query.sort_by || "news_category_name"
      const order_by = request.query.order_by || "ASC"
      const result = await categoryModel.readNewsCategory(
        search_news_category_name, sort_by, order_by
      );
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot read any news category!"
      );
    }
  },
  updateNewsCategory: async (request, response) => {
    try {
      const category_id = request.params.category_id;
      const data = {
        news_category_name: request.body.news_category_name,
        date_updated: new Date(),
      };
      const result = await categoryModel.updateNewsCategory(data, category_id);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot update news category!"
      );
    }
  },
  deleteNewsCategory: async (request, response) => {
    try {
      const category_id = request.params.category_id;
      const result = await categoryModel.deleteNewsCategory(category_id);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot delete news category!"
      );
    }
  },
};
