const crypto = require("crypto");

module.exports = {
  response: (response, status, data) => {
    const result = {};

    result.status = status || 200;
    result.result = data;
    return response.status(result.status).json(result);
  },
};
