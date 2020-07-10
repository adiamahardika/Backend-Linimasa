const userRoleModel = require("../models/user_role");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");

module.exports = {
  insertUserRole: async (request, response) => {
    try {
      const id = uniqid.time();
      const data = {
        id,
        user_role_name: request.body.user_role_name,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await userRoleModel.insertUserRole(data);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot insert user role!");
    }
  },
  readUserRole: async (request, response) => {
    try {
      const search_user_role = request.query.user_role_name || "";
      const result = await userRoleModel.readUserRole(search_user_role);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(
        response,
        404,
        "Cannot read any user role!"
      );
    }
  },
};
