const multer = require("multer");
const crypto = require("crypto");
const sharp = require("sharp");

const filename = (request, file, callback) => {
  let customFileName = Date.now() + crypto.randomBytes(6).toString("hex"),
    fileExtension = file.originalname.split(".")[
      file.originalname.split(".").length - 1
    ];
  callback(null, customFileName + "." + fileExtension);
};
const imageFilter = (request, file, callback) => {
  const imageFilter = file.mimetype.toLowerCase();
  if (
    imageFilter === "image/png" ||
    imageFilter === "image/jpeg" ||
    imageFilter === "image/jpg"
  ) {
    return callback(null, true);
  } else {
    return callback(
      null,
      false,
      new Error(
        "Just image with extension .png, .jpg, and .jpeg can be upload!"
      )
    );
  }
};
const videoFilter = (request, file, callback) => {
  const imageFilter = file.mimetype.toLowerCase();
  if (imageFilter === "video/mp4") {
    return callback(null, true);
  } else {
    return callback(
      null,
      false,
      new Error("Just video with extension .mp4 can be upload!")
    );
  }
};
const imageLimits = {
  fileSize: 1024 * 1024 * 2,
};
const videoLimits = {
  fileSize: 1024 * 1024 * 12,
};
module.exports = {
  compress: async (path) => {
    await sharp("./" + path)
      .toBuffer()
      .then(async (data) => {
       await sharp(data)
          .jpeg({
            quality: 80,
          })
          .toFile("./" + path);
      })
  },
  uploadNewsImages: multer({
    fileFilter: imageFilter,
    limits: imageLimits,
    storage: multer.diskStorage({
      destination: (request, file, callback) => {
        callback(null, "./assets/upload/images/news");
      },
      filename,
    }),
  }).single("news_image"),
  uploadProfileImages: multer({
    fileFilter: imageFilter,
    limits: imageLimits,
    storage: multer.diskStorage({
      destination: (request, file, callback) => {
        callback(null, "./assets/upload/images/profile");
      },
      filename,
    }),
  }).single("user_image"),
  uploadAdsImages: multer({
    fileFilter: imageFilter,
    limits: imageLimits,
    storage: multer.diskStorage({
      destination: (request, file, callback) => {
        callback(null, "./assets/upload/images/ads");
      },
      filename,
    }),
  }).single("ads_image"),
  uploadIklanBarisImages: multer({
    fileFilter: imageFilter,
    limits: imageLimits,
    storage: multer.diskStorage({
      destination: (request, file, callback) => {
        callback(null, "./assets/upload/images/iklan_baris");
      },
      filename,
    }),
  }).single("iklan_baris_image"),
  uploadVideo: multer({
    fileFilter: videoFilter,
    limits: videoLimits,
    storage: multer.diskStorage({
      destination: (request, file, callback) => {
        callback(null, "./assets/upload/videos");
      },
      filename,
    }),
  }).single("video"),
};
