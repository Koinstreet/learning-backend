const express = require("express");


// NEW CONTROLLERS
const ChapterToolKit = require("../controllers/v1/chapterToolKits");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const fileUploader = require("../middleware/fileUploaders");

const router = express.Router();

router.get("/", ChapterToolKit.getAllChapterToolKits);
router.get("/:id", ChapterToolKit.getChapterToolKit);

router.use(authMiddleware.protect);
router.post(
    "/",
    fileUploader.uploadCourseImage,
    ChapterToolKit.createChapterToolKit
  );
router
  .route("/:id")
  .patch(fileUploader.uploadCourseImage, ChapterToolKit.updateChapterToolKit)
  .delete(ChapterToolKit.deleteChapterToolKit);

module.exports = router;
