const userModel = require("../models/user");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip, JWT_Key, JWT_Refresh } = require("../configs");
const JWT = require("jsonwebtoken");
const tokenList = {};
const filesystem = require("fs").promises;
const { compress } = require("./upload");
const deleteFile = async (user_id) => {
  const checkId = await userModel.checkId(user_id);
  const dataUser = checkId[0];
  if (
    dataUser.user_image !=
    `http://${ip}/assets/upload/images/profile/default-profile-images.png`
  ) {
    const path = dataUser.user_image.replace(
      `http://${ip}`,
      `../backend_lensajabar`
    );
    await filesystem.unlink(path);
  }
};

module.exports = {
  register: async (request, response) => {
    try {
      await compress(request.file.path);
      const emailValid = await userModel.checkEmail(request.body.user_email);
      const dataUser = emailValid[0];
      if (dataUser == undefined) {
        const user_salt = miscHelper.generateSalt(18);
        const hashPassword = miscHelper.setPassword(
          request.body.user_password,
          user_salt
        );
        const user_name = request.body.user_name;
        const id =
          user_name
            .toLowerCase()
            .replace(/[^a-zA-Z0-9- ]/g, "")
            .split(" ")
            .join("-") +
          "-" +
          uniqid.process();
        if (!request.file || Object.keys(request.file).length === 0) {
          const data = {
            id,
            user_name,
            user_email: request.body.user_email,
            user_password: hashPassword.passwordHash,
            user_salt: hashPassword.user_salt,
            user_role: request.body.user_role,
            user_birth_date: request.body.user_birth_date,
            user_phone_number: request.body.user_phone_number,
            user_points: 0,
            user_image: `http://${ip}/assets/upload/images/profile/default-profile-images.png`,
            date_created: new Date(),
            date_updated: new Date(),
          };
          const result = await userModel.register(data);
          miscHelper.customResponse(response, 200, result);
        } else {
          const data = {
            id,
            user_name,
            user_email: request.body.user_email,
            user_password: hashPassword.passwordHash,
            user_salt: hashPassword.user_salt,
            user_role: request.body.user_role,
            user_birth_date: request.body.user_birth_date,
            user_phone_number: request.body.user_phone_number,
            user_points: 0,
            user_image: `http://${ip}/assets/upload/images/profile/${request.file.filename}`,
            date_created: new Date(),
            date_updated: new Date(),
          };
          const result = await userModel.register(data);
          miscHelper.customResponse(response, 200, result);
        }
      } else {
        miscHelper.customErrorResponse(
          response,
          404,
          "Your email has already registered!"
        );
      }
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot register user!");
    }
  },
  login: async (request, response) => {
    const emailValid = await userModel.checkEmail(request.body.user_email);
    const dataUser = emailValid[0];
    if (dataUser !== undefined) {
      const data = {
        user_password: request.body.user_password,
        user_email: request.body.user_email,
      };
      const hashPassword = miscHelper.setPassword(
        data.user_password,
        dataUser.user_salt
      );
      if (hashPassword.passwordHash === dataUser.user_password) {
        const user = {
          user_email: dataUser.user_email,
          id: dataUser.id,
        };
        const token = JWT.sign(user, JWT_Key, { expiresIn: "1h" });
        const refresh_token = JWT.sign(user, JWT_Refresh, { expiresIn: "7d" });

        delete dataUser.user_salt;
        delete dataUser.user_password;
        delete dataUser.user_image;
        delete dataUser.user_birth_date;
        delete dataUser.user_points;
        delete dataUser.user_phone_number;
        delete dataUser.date_created;
        delete dataUser.date_updated;

        dataUser.token = token;
        dataUser.refresh_token = refresh_token;

        tokenList[dataUser.user_email] = dataUser;
        miscHelper.customResponse(response, 200, dataUser);
      } else {
        return miscHelper.customErrorResponse(
          response,
          404,
          "Your password is incorrect!"
        );
      }
    } else {
      return miscHelper.customErrorResponse(
        response,
        404,
        "Your email is incorrect!"
      );
    }
  },
  token: async (request, response) => {
    const setData = request.body;
    if (setData.refresh_token == tokenList[setData.user_email].refresh_token) {
      const user = {
        user_email: tokenList.user_email,
        id: tokenList.id,
      };
      const token = JWT.sign(user, JWT_Key, { expiresIn: "1h" });

      tokenList[setData.user_email].token = token;

      miscHelper.customResponse(response, 200, tokenList[setData.user_email]);
    } else {
      return miscHelper.customErrorResponse(
        response,
        404,
        "Cannot refresh token!"
      );
    }
  },
  readUser: async (request, response) => {
    try {
      const user_id = request.params.user_id || null;
      const search_user_name = request.query.user_name || "";
      const search_role = request.query.user_role || "";
      const sort_by = request.query.sort_by || "user_name";
      const order_by = request.query.order_by || "ASC";
      const total_data = await userModel.countUser(
        user_id,
        search_user_name,
        search_role,
        sort_by,
        order_by
      );
      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 25;
      const start_index = (page - 1) * limit;
      const pagination = {
        total_data,
        page,
        limit,
        start_index,
      };
      const result = await userModel.readUser(
        user_id,
        search_user_name,
        search_role,
        sort_by,
        order_by,
        start_index,
        limit
      );
      miscHelper.customResponsePagination(response, 200, result, pagination);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot read any user!");
    }
  },
  updateUser: async (request, response) => {
    try {
      const user_id = request.params.user_id;
      if (!request.file || Object.keys(request.file).length === 0) {
        const data = {
          user_name: request.body.user_name,
          user_email: request.body.user_email,
          user_role: request.body.user_role,
          user_birth_date: request.body.user_birth_date,
          user_phone_number: request.body.user_phone_number,
          user_points: request.body.user_points,
          date_updated: new Date(),
        };
        const result = await userModel.updateUser(data, user_id);
        miscHelper.customResponse(response, 200, result);
      } else {
        await deleteFile(user_id);
        await compress(request.file.path);
        const data = {
          user_name: request.body.user_name,
          user_email: request.body.user_email,
          user_role: request.body.user_role,
          user_birth_date: request.body.user_birth_date,
          user_phone_number: request.body.user_phone_number,
          user_points: 0,
          user_image: `http://${ip}/assets/upload/images/profile/${request.file.filename}`,
          date_updated: new Date(),
        };
        const result = await userModel.updateUser(data, user_id);
        miscHelper.customResponse(response, 200, result);
      }
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot update user!");
    }
  },
  deleteUser: async (request, response) => {
    try {
      const user_id = request.params.user_id;
      await deleteFile(user_id);
      const result = await userModel.deleteUser(user_id);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot delete user!");
    }
  },
};
