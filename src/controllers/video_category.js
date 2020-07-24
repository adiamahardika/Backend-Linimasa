const videoCategoryModel = require("../models/video_category");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");

module.exports = {
  insertVideoCategory: async (request, response) => {
    try {
      const video_category_name = request.body.video_category_name
      const videoCategoryValid = await videoCategoryModel.checkVideoCategoryName( video_category_name )
      const dataVideoCategory = videoCategoryValid[0]
      if (dataVideoCategory === undefined) {
        const id = uniqid.time();
        const data = {
          id,
          video_category_name,
          date_created: new Date(),
          date_updated: new Date(),
        };
        const result = await videoCategoryModel.insertVideoCategory(data);
        miscHelper.customResponse(response, 200, result); 
      } else {
        miscHelper.customErrorResponse(response, 404, 'This video category has already in database!')
      }
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
      const search_video_category_name =
        request.query.video_category_name || "";
      const result = await videoCategoryModel.readVideoCategory(
        search_video_category_name
      );
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        200,
        "Cannot read any video category!"
      );
    }
  },
  updateVideoCategory: async (request, response) => {
    try {
      const video_category_id = request.params.video_category_id;
      const data = {
        video_category_name: request.body.video_category_name,
        date_updated: new Date(),
      };
      const result = await videoCategoryModel.updateVideoCategory(
        data,
        video_category_id
      );
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot update video category!"
      );
    }
  },
  deleteVideoCategory: async (request, response) => {
    try {
      const video_category_id = request.params.video_category_id;
      const result = await videoCategoryModel.deleteVideoCategory(
        video_category_id
      );
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot delete video category!"
      );
    }
  },
};
