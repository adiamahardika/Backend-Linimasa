const multer = require("multer");
const crypto = require("crypto")

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./assets/upload/images");
  },
  filename: function (request, file, callback) {
    let customFileName = Date.now() + crypto.randomBytes(18).toString('hex'),
    fileExtension = file.originalname.split('.')[1]
    callback(null, customFileName + '.' + fileExtension);
  },
});

const uploadImages = multer({
  storage,
}).single("news_image");

module.exports = uploadImages;
