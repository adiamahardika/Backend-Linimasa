const iklanBarisModel = require("../models/iklan_baris");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip } = require("../configs");
const filesystem = require("fs").promises;

module.exports = {
  insertIklanBaris: async (request, response) => {
    try {
      const iklan_baris_title = request.body.iklan_baris_title;
      const id =
        iklan_baris_title
          .toLowerCase()
          .replace(/[^a-zA-Z0-9- ]/g, "")
          .split(" ")
          .join("-") +
        "-" +
        uniqid.process();
      const data = {
        id,
        iklan_baris_title,
        iklan_baris_image: `http://${ip}/assets/upload/images/iklan_baris/${request.file.filename}`,
        iklan_baris_description: request.body.iklan_baris_description,
        iklan_baris_price: request.body.iklan_baris_price,
        iklan_baris_category: request.body.iklan_baris_category,
        iklan_baris_author: request.body.iklan_baris_author,
        iklan_baris_contact: request.body.iklan_baris_contact,
        iklan_baris_address: request.body.iklan_baris_address,
        iklan_baris_province: request.body.iklan_baris_province,
        iklan_baris_city: request.body.iklan_baris_city,
        iklan_baris_sub_district: request.body.iklan_baris_sub_district,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await iklanBarisModel.insertIklanBaris(data);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot insert iklan baris!"
      );
    }
  },
};
