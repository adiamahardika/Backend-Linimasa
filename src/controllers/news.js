const newsModel = require("../models/news");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip } = require("../configs");
const { request } = require("express");
const { response } = require("../helpers");

module.exports = {
  insertNews: async (request, response) => {
    try {
      const id = uniqid.process();
      const data = {
        id,
        news_title: request.body.news_title,
        news_content: request.body.news_content,
        news_image: `http://${ip}/assets/upload/images/${request.file.filename}`,
        news_image_description: request.body.news_image_description,
        news_category: request.body.news_category,
        news_author: request.body.news_author,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await newsModel.insertNews(data);
      miscHelper.response(response, 200, result);
    } catch(error) {
        console.log(error)
    }
  }
};
