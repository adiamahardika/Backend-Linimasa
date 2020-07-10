const categoryModel = require("../models/news_category");
const miscHelper = require("../helpers");
const uniqid = require('uniqid')
module.exports = {
  insertNewsCategory: async (request, response) => {
    try {
      const id = uniqid.time();
      const data = {
        id,
        news_category_name: request.body.news_category_name,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await categoryModel.insertNewsCategory(data);
      miscHelper.response(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot insert news category!"
      );
    }
  },
};
