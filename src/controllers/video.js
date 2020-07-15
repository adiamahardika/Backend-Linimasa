const videoModel = require("../models/video");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip } = require("../configs");

module.exports = {
  insertVideo: async (request, response) => {
    try {
      const video_title = request.body.video_title;
      const id =
        video_title
          .toLowerCase()
          .replace(/[^a-zA-Z0-9- ]/g, "")
          .split(" ")
          .join("-") + "-" +
        Date.now() +
        uniqid.process();
      const data = {
        id,
        video_title,
        video: `http://${ip}/assets/upload/videos/${request.file.filename}`,
        video_description: request.body.video_description,
        video_author: request.body.video_author,
        video_category: request.body.video_category,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await videoModel.insertVideo(data);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
        console.log(error)
        miscHelper.customErrorResponse(response, 404, 'Cannot insert video!')
    }
  },
};
