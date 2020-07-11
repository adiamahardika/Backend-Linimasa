const userModel = require("../models/user");
const miscHelper = require("../helpers");
const uniqid = require('uniqid')
const { ip } = require("../configs");
const JWT = require("jsonwebtoken");
const { JWT_Key } = require("../configs");

module.exports = {
  register: async (request, response) => {
    try {
        const salt = miscHelper.generateSalt(18)
        const hashPassword = miscHelper.setPassword(request.body.user_password, salt)
        const id = Date.now() + uniqid.process();
        const data = {
            id,
            user_name: request.body.user_name,
            user_email: request.body.user_email,
            user_password: hashPassword.passwordHash,
            user_salt: hashPassword.salt,
            user_role: request.body.user_role,
            user_birth_date: request.body.user_birth_date,
            user_phone_number: request.body.user_phone_number,
            user_points: 0,
            user_image:`http://${ip}/assets/upload/images/profile/${request.file.filename}`,
            date_created: new Date(),
            date_updated: new Date()
        }
        console.log(data)
        const result = await userModel.register(data)
        miscHelper.customResponse(response, 200, result)
    } catch (error) {
        console.log(error)
        miscHelper.customErrorResponse(response, 404, "Cannot register any user")
    }
  },
};
