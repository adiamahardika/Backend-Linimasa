const connection = require("../src/configs/mysql");
describe("connection", () => {
  beforeEach(async() => {
    await connection.remove({}, (error) => {
    });
  });
});

require("./api/api_news_category_test");
require("./api/api_iklan_baris_category_test");
require("./api/api_job_vacancy_category_test")