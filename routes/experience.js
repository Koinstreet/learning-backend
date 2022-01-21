const express = require("express");

// NEW CONTROLLERS
const Experience = require("../controllers/v1/experience");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const fileUploader = require("../middleware/fileUploaders");

const router = express.Router();

router.get("/", Experience.getAllExperience);

router.get("/:id", Experience.getExperience);

router.use(authMiddleware.protect);

router.get("/userExperience", Experience.getAllUserExperience);

router.post("/", fileUploader.uploadExperience, Experience.createExperience);
router
  .route("/:id")
  .patch(fileUploader.uploadExperience, Experience.updateExperience)
  .delete(Experience.deleteExperience);

module.exports = router;
