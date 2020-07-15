const videoCategoryModel = require("../models/video_category");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");

module.exports = {
  insertVideoCategory: async (request, response) => {
    try {
      const id = uniqid.time();
      const data = {
        id,
        video_category_name: request.body.video_category_name,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await videoCategoryModel.insertVideoCategory(data);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot insert video category!"
      );
    }
  },
  readVideoCategory: async (request, response) => {
      try {
          const search_video_category_name = request.query.video_category_name || ""
          const result = await videoCategoryModel.readVideoCategory(search_video_category_name)
          miscHelper.customResponse(response, 200, result)
      } catch (error) {
          console.log(error)
          miscHelper.customErrorResponse(response, 200, 'Cannot read any video category!')
      }
  }
};
