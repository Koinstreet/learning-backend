const express = require("express");

// NEW CONTROLLERS
const Education = require("../controllers/v1/education");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const fileUploader = require("../middleware/fileUploaders");

const router = express.Router();

router.get("/", Education.getAllEducation);

router.get("/:id", Education.getEducation);

router.use(authMiddleware.protect);

router.get("/userEducation", Education.getAllUserEducation);

router.post("/", fileUploader.uploadEducation, Education.createEducation);
router
  .route("/:id")
  .patch(fileUploader.uploadEducation, Education.updateEducation)
  .delete(Education.deleteEducation);

module.exports = router;
