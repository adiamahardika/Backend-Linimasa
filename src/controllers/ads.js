const adsModel = require("../models/ads");
const miscHelper = require("../helpers");
const uniqid = require("uniqid");
const { ip } = require("../configs");
const fileSystem = require("fs").promises;
const { compress } = require("../controllers/upload")

const deleteFile = async (ads_id) => {
  const checkId = await adsModel.checkId(ads_id);
  const dataAds = checkId[0];
  if (dataAds !== undefined) {
    const path = dataAds.ads_image.replace(
      `http://${ip}`,
      `../backend_lensajabar`
    );
    await fileSystem.unlink(path);
  }
};
module.exports = {
  insertAds: async (request, response) => {
    try {
      compress(request.file.path)
      const ads_name = request.body.ads_name;
      const id =
        ads_name.toLowerCase().split(" ").join("-") + "-" + uniqid.time();
      const data = {
        id,
        ads_name,
        ads_image: `http://${ip}/assets/upload/images/ads/${request.file.filename}`,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const result = await adsModel.insertAds(data);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot insert ads!");
    }
  },
  readAds: async (request, response) => {
    try {
      const ads_id = request.params.ads_id || null;
      const result = await adsModel.readAds(ads_id);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot read any ads!");
    }
  },
  updateAds: async (request, response) => {
    try {
      const ads_id = request.params.ads_id;
      if (!request.file || Object.keys(request.file).length === 0) {
        const data = {
          ads_name: request.body.ads_name,
          date_updated: new Date(),
        };
        const result = await adsModel.updateAds(data, ads_id);
        miscHelper.customResponse(response, 200, result);
      } else {
        await deleteFile(ads_id);
        const data = {
          ads_name: request.body.ads_name,
          ads_image: `http://${ip}/assets/upload/images/ads/${request.file.filename}`,
          date_updated: new Date(),
        };
        const result = await adsModel.updateAds(data, ads_id);
        miscHelper.customResponse(response, 200, result);
      }
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot update ads!");
    }
  },
  deleteAds: async (request, response) => {
    try {
      const ads_id = request.params.ads_id;
      await deleteFile(ads_id);
      const result = await adsModel.deleteAds(ads_id);
      miscHelper.customResponse(response, 200, result);
    } catch (error) {
      console.log(error);
      miscHelper.customErrorResponse(response, 404, "Cannot delete ads!");
    }
  },
};
