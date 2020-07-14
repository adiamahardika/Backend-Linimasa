const crypto = require("crypto");

module.exports = {
  customResponse: (response, status, data) => {
    const result = {};

    result.status = status || 200;
    result.result = data;
    return response.status(result.status).json(result);
  },
  customErrorResponse: (response, status, message) => {
    const result = {};

    result.status = status || 400;
    result.message = message;

    return response.status(result.status).json(result);
  },
  generateSalt: (length) => {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);
  },
  setPassword: (user_password, user_salt) => {
    const hash = crypto.createHmac("sha512", user_salt);
    hash.update(user_password);
    const value = hash.digest("hex");
    return {
      user_salt: user_salt,
      passwordHash: value,
    };
  },
};
