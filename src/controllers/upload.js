const multer = require("multer");
const crypto = require("crypto");

const filename = (request, file, callback) => {
  let customFileName = Date.now() + crypto.randomBytes(6).toString("hex"),
    fileExtension = file.originalname.split(".")[file.originalname.split('.').length -1];
  callback(null, customFileName + "." + fileExtension);
};

module.exports = {
  uploadNewsImages: multer({
    storage: multer.diskStorage({
      destination: (request, file, callback) => {
        callback(null, "./assets/upload/images/news");
      },
      filename,
    }),
  }).single("news_image"),
  uploadProfileImages: multer({
    storage: multer.diskStorage({
      destination: (request, file, callback) => {
        callback(null, "./assets/upload/images/profile");
      },
      filename,
    }),
  }).single("user_image"),
  uploadAdsImages: multer({
    storage: multer.diskStorage({
      destination: (request, file, callback) => {
        callback(null, "./assets/upload/images/ads");
      },
      filename,
    }),
  }).single("ads_image"),
  uploadIklanBarisImages: multer({
    storage: multer.diskStorage({
      destination: (request, file, callback) => {
        callback(null, "./assets/upload/images/iklan_baris");
      },
      filename,
    }),
  }).single("iklan_baris_image"),
  uploadVideo: multer({
    storage: multer.diskStorage({
      destination: (request, file, callback) => {
        callback(null, "./assets/upload/videos");
      },
      filename: (request, file, callback) => {
        let customFileName = Date.now() + crypto.randomBytes(6).toString("hex"),
          fileExtension = file.originalname.split(".")[file.originalname.split('.').length -1];
        callback(null, customFileName + "." + fileExtension);
      },
    }),
  }).single("video"),
};
