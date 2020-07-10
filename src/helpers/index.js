const crypto = require("crypto");

module.exports = {
  customResponse: (response, status, data) => {
    const result = {};

    result.status = status || 200;
    result.result = data;
    return response.status(result.status).json(result);
  },
  customErrorResponse: (response, status, message) => {
    const result = {}

    result.status = status || 400
    result.message = message

    return response.status(result.status).json(result)
  }
};
