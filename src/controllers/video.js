const videoModel = require("../models/video");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip } = require("../configs");
const filesystem = require("fs").promises;

const deleteFile = async (video_id) => {
  const checkId = await videoModel.checkId(video_id);
  const dataVideo = checkId[0];
  if (dataVideo !== undefined) {
    const path = dataVideo.video.replace(
      `http://${ip}`,
      `../backend_lensajabar`
    );
    await filesystem.unlink(path);
  }
};
module.exports = {
  insertVideo: async (request, response) => {
    try {
      const video_title = request.body.video_title;
      const id =
        video_title
          .toLowerCase()
          .replace(/[^a-zA-Z0-9- ]/g, "")
          .split(" ")
          .join("-") +
        "-" +
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
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot insert video!");
    }
  },
  readVideo: async (request, response) => {
    try {
      const video_id = request.params.video_id || null;
      const search_title = request.query.video_title || "";
      const search_category = request.query.video_category || "";
      const sort_by = request.query.sort_by || "date_updated";
      const order_by = request.query.order_by || "DESC";
      const total_data = await videoModel.countVideo(
        video_id,
        search_title,
        search_category,
        sort_by,
        order_by
      );
      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 5;
      const start_index = (page - 1) * limit;
      const pagination = {
        total_data,
        page,
        limit,
        start_index,
      };
      const result = await videoModel.readVideo(
        video_id,
        search_title,
        search_category,
        sort_by,
        order_by,
        start_index,
        limit
      );
      miscHelper.customResponsePagination(response, 200, result, pagination);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot read any video!");
    }
  },
  updateVideo: async (request, response) => {
    try {
      const video_id = request.params.video_id;
      if (!request.file || Object.keys(request.file).length === 0) {
        const data = {
          video_title: request.body.video_title,
          video_description: request.body.video_description,
          video_author: request.body.video_author,
          video_category: request.body.video_category,
          date_updated: new Date(),
        };
        const result = await videoModel.updateVideo(data, video_id);
        miscHelper.customResponse(response, 200, result);
      } else {
        await deleteFile(video_id);
        const data = {
          video_title: request.body.video_title,
          video: `http://${ip}/assets/upload/videos/${request.file.filename}`,
          video_description: request.body.video_description,
          video_author: request.body.video_author,
          video_category: request.body.video_category,
          date_updated: new Date(),
        };
        const result = await videoModel.updateVideo(data, video_id);
        miscHelper.customResponse(response, 200, result);
      }
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot update video!");
    }
  },
  deleteVideo: async (request, response) => {
    try {
      const video_id = request.params.video_id;
      await deleteFile(video_id);
      const result = await videoModel.deleteVideo(video_id);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot delete video!");
    }
  },
};
