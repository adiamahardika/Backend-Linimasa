const multer = require("multer");
const crypto = require("crypto");

const filename = (request, file, callback) => {
  let customFileName = Date.now() + crypto.randomBytes(6).toString("hex"),
    fileExtension = file.originalname.split(".")[1];
  callback(null, customFileName + "." + fileExtension);
};

module.exports = {
  uploadNewsImages: multer({
    storage: multer.diskStorage({
      destination: function (request, file, callback) {
        callback(null, "./assets/upload/images/news");
      },
      filename,
    }),
  }).single("news_image"),
  uploadProfileImages: multer({
    storage: multer.diskStorage({
      destination: function (request, file, callback) {
        callback(null, "./assets/upload/images/profile");
      },
      filename,
    }),
  }).single("user_image"),
  uploadAdsImages: multer({
    storage: multer.diskStorage({
      destination: function (request, file, callback) {
        callback(null, "./assets/upload/images/ads");
      },
      filename,
    }),
  }).single("ads_image"),
};
