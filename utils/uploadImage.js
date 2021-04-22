const cloudinary = require("cloudinary").v2;

// Error
const AppError = require("../utils/appError");

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = (file) => {
  console.log(file)
    const path = file.path;
    const fileName = file.filename;
    return cloudinary.uploader.upload(
      path,
      {
        public_id: `images/${fileName}`,
        resource_type: "auto",
      },
      (err, result) => {
        // remove file from server
        if (err) {
          console.log(err);
          return {err, link: null, publicId: null}
        };
        const fs = require("fs");
        fs.unlinkSync(path);
        // return image details
        return { err: null, link: result.url, publicId: `images/${fileName}` };
      }
    );
  
}

module.exports = uploadImage;