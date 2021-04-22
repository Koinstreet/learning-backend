const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date().toISOString().replace(/[\/\\:]/g, "_")}-${
        file.originalname
      }`
    );
  },
});

const multerImageFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else cb(new Error("invalid filetype"), false);
};

const multerVideoFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype.startsWith("video")) {
    cb(null, true);
  } else cb(new Error("invalid filetype"), false);
};

const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerImageFilter,
});

const uploadVideo = multer({
  storage: multerStorage,
  fileFilter: multerVideoFilter,
});

exports.uploadCourseImage = uploadImage.single("image");
exports.uploadModuleVideo = uploadVideo.single("video");
exports.uploadUserImage = uploadImage.single("profilePicture");
