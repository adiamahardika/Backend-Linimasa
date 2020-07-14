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
      const commentar_id = request.params.commentar_id || null
      const search_user = request.query.user_name || null
      const search_news = request.query.search_news || null
      const result = await commentarModel.readCommentar(commentar_id, search_user, search_news)
      miscHelper.customResponse(response, 200, result)
    } catch (error) {
      console.log(error)
      miscHelper.customErrorResponse(response, 404, 'Cannot read any commentar!')
    }
  }
};
