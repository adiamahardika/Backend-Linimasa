const iklanBarisCategoryModel = require("../models/iklan_baris_category");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");

module.exports = {
  insertIklanBarisCategory: async (request, response) => {
    try {
      const id = uniqid.time();
      const data = {
        id,
        iklan_baris_category_name: request.body.iklan_baris_category_name,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await iklanBarisCategoryModel.insertIklanBarisCategory(
        data
      );
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot insert iklan baris category!"
      );
    }
  },
  readIklanBarisCategory: async (request, response) => {
    try {
      const search_iklan_baris_category_name =
        request.query.iklan_baris_category_name || "";
      const result = await iklanBarisCategoryModel.readIklanBarisCategory(
        search_iklan_baris_category_name
      );
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot read any iklan baris category!"
      );
    }
  },
  updateIklanBarisCategory: async (request, response) => {
    try {
      const iklan_baris_category_id = request.params.iklan_baris_category_id;
      const data = {
        iklan_baris_category_name: request.body.iklan_baris_category_name,
        date_updated: new Date(),
      };
      const result = await iklanBarisCategoryModel.updateIklanBarisCategory(
        data,
        iklan_baris_category_id
      );
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot update iklan baris category!"
      );
    }
  },
  deleteIklanBarisCategory: async (request, response) => {
    try {
      const iklan_baris_category_id = request.params.iklan_baris_category_id;
      const result = await iklanBarisCategoryModel.deleteIklanBarisCategory(
        iklan_baris_category_id
      );
      miscHelper.customErrorResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot delete iklan baris category!"
      );
    }
  },
};
