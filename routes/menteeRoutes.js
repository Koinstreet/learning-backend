const express = require("express");

// NEW CONTROLLERS
const mentee = require("../controllers/v1/mentee");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const fileUploader = require("../middleware/fileUploaders");

const router = express.Router();

router.get("/", mentee.getAllMentee);

router.get("/:id", mentee.getMentee);

router.use(authMiddleware.protect);

router.post("/", fileUploader.uploadQRImage, mentee.createMentee);
router
  .route("/:id")
  .patch(fileUploader.uploadQRImage, mentee.updateMentee)
  .delete(mentee.deleteMentee);

module.exports = router;
