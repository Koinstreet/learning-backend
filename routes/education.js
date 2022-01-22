const express = require("express");

// NEW CONTROLLERS
const Education = require("../controllers/v1/Education");

const fileUploader = require("../middleware/fileUploaders");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", Education.getAllEducation);

router.use(authMiddleware.protect);

router.get("/userEducation", Education.getAllUserEducation);

router.get("/:id", Education.getEducation);

router.post("/", fileUploader.uploadEducation, Education.createEducation);
router
  .route("/:id")
  .patch(fileUploader.uploadEducation, Education.updateEducation)
  .delete(Education.deleteEducation);

module.exports = router;
