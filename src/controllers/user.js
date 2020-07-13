const userModel = require("../models/user");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip, JWT_Key, JWT_Refresh } = require("../configs");
const JWT = require("jsonwebtoken");
const tokenList = {};

module.exports = {
  register: async (request, response) => {
    try {
      const user_salt = miscHelper.generateSalt(18);
      const hashPassword = miscHelper.setPassword(
        request.body.user_password,
        user_salt
      );
      const id = Date.now() + uniqid.process();
      const data = {
        id,
        user_name: request.body.user_name,
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
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot register any user");
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
        const refreshToken = JWT.sign(user, JWT_Refresh, { expiresIn: "7d" });

        delete dataUser.user_salt;
        delete dataUser.user_password;

        dataUser.token = token;
        dataUser.refreshToken = refreshToken;

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
    setData = request.body;
    if (setData.refreshToken == tokenList[setData.user_email].refreshToken) {
      const user = {
        user_email: tokenList.user_email,
        id: tokenList.id,
      };
      const token = JWT.sign(user, JWT_Key, { expiresIn: "1h" });

      tokenList[setData.user_email].token = token;

      miscHelper.customResponse(response, 200, tokenList);
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
      const result = await userModel.readUser(user_id, search_user_name, search_role);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot read any user!");
    }
  },
};
