const crypto = require("crypto");

module.exports = {
  customResponse: (response, status, data) => {
    const result = {};

    result.status = status || 200;
    result.result = data;
    return response.status(result.status).json(result);
  },
  customResponsePagination: (response, status, data, pagination) => {
    const result = {}
    const page = pagination.page
    const limit = pagination.limit
    const total_data = pagination.total_data
    const start_index = pagination.start_index
    const end_index = page * limit
    
    result.status = status || 200
    result.total_data = total_data
    result.total_pages = Math.ceil(total_data / limit)
    if (end_index < total_data){
      result.next_page = {
        page: page + 1,
        limit: limit
      }
    }
    if(start_index > 0) {
      result.previous = {
        page: page - 1,
        limit: limit
      }
    }
    result.result = data
    return response.status(result.status).json(result)
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
