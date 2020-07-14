const commentarModel = require("../models/commentar");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");

module.exports = {
  insertCommentar: async (request, response) => {
    try {
      const id = Date.now() + uniqid.process();
      const data = {
        id,
        news_id: request.body.news_id,
        user_id: request.body.user_id,
        commentar: request.body.commentar,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await commentarModel.insertCommentar(data);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 200, "Cannot insert commentar!");
    }
  },
  readCommentar: async (request, response) => {
    try {
      const data = {
      commentar_id : request.params.commentar_id || null,
      search_user_name : request.query.user_name || "",
      search_news_id : request.query.news_id || "",
      search_commentar : request.query.commentar || ""
      }
      const result = await commentarModel.readCommentar(data)
      miscHelper.customResponse(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Cannot read any commentar!')
    }
  },
  updateCommentar: async (request, response) => {
    try {
      const commentar_id = request.params.commentar_id
      const data = {
        commentar : request.body.commentar,
        date_updated : new Date()
      }
      const result = await commentarModel.updateCommentar(data, commentar_id)
      miscHelper.customResponse(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Cannot update commentar!')
    }
  }
};
