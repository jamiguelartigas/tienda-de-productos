
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

module.exports = function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ 
        folder: "products" 
    },
      (err, result) => (err ? reject(err) : resolve(result))
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
