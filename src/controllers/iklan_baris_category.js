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
};
