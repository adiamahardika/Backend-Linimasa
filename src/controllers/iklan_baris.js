const iklanBarisModel = require("../models/iklan_baris");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip } = require("../configs");
const { error } = require("console");
const filesystem = require("fs").promises;

const deleteFile = async (iklan_baris_id) => {
  const checkId = await iklanBarisModel.checkId(iklan_baris_id);
  const dataIklanBaris = checkId[0];
  if (dataIklanBaris !== undefined) {
    const path = dataIklanBaris.iklan_baris_image.replace(
      `http://${ip}`,
      `../backend_lensajabar`
    );
        await filesystem.unlink(path);
  }
};
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
  readIklanBaris: async (request, response) => {
    try {
      const iklan_baris_id = request.params.iklan_baris_id || null;
      const search_title = request.query.iklan_baris_title || "";
      const search_category = request.query.iklan_baris_category || "";
      const sort_by = request.query.sort_by || "date_updated";
      const order_by = request.query.order_by || "DESC";
      const total_data = await iklanBarisModel.countIklanBaris(
        iklan_baris_id,
        search_title,
        search_category,
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
      const result = await iklanBarisModel.readIklanBaris(
        iklan_baris_id,
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
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot read any iklan baris!"
      );
    }
  },
  updateIklanBaris: async (request, response) => {
    try {
      const iklan_baris_id = request.params.iklan_baris_id;
      if (!request.file || Object.keys(request.file).length === 0) {
        const data = {
          iklan_baris_title: request.body.iklan_baris_title,
          iklan_baris_description: request.body.iklan_baris_description,
          iklan_baris_price: request.body.iklan_baris_price,
          iklan_baris_category: request.body.iklan_baris_category,
          iklan_baris_author: request.body.iklan_baris_author,
          iklan_baris_contact: request.body.iklan_baris_contact,
          iklan_baris_address: request.body.iklan_baris_address,
          iklan_baris_province: request.body.iklan_baris_province,
          iklan_baris_city: request.body.iklan_baris_city,
          iklan_baris_sub_district: request.body.iklan_baris_sub_district,
          date_updated: new Date(),
        };
        const result = await iklanBarisModel.updateIklanBaris(
          data,
          iklan_baris_id
        );
        miscHelper.customResponse(response, 200, result);
      } else {
        await deleteFile(iklan_baris_id);
        const data = {
          iklan_baris_title: request.body.iklan_baris_title,
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
          date_updated: new Date(),
        };
        const result = await iklanBarisModel.updateIklanBaris(
          data,
          iklan_baris_id
        );
        miscHelper.customResponse(response, 200, result);
      }
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot update iklan baris!"
      );
    }
  },
  deleteIklanBaris: async (request, response) => {
    try {
      const iklan_baris_id = request.params.iklan_baris_id;
      await deleteFile(iklan_baris_id);
      const result = await iklanBarisModel.deleteIklanBaris(iklan_baris_id);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot delete iklan baris!"
      );
    }
  },
};
