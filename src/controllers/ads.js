const adsModel = require("../models/ads");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip } = require("../configs");

module.exports = {
  insertAds: async (request, response) => {
    try {
      const id =
        request.body.ads_name.toLowerCase().split(" ").join("-") + "-" + uniqid.time();
      const data = {
        id,
        ads_name: request.body.ads_name,
        ads_image: `http://${ip}/assets/upload/images/ads/${request.file.filename}`,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await adsModel.insertAds(data);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 200, "Cannot insert ads!");
    }
  },
};
