const express = require("express");

// NEW CONTROLLERS
const PersonalProject = require("../controllers/v1/personalProject");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const fileUploader = require("../middleware/fileUploaders");

const router = express.Router();

router.get("/", PersonalProject.getAllPersonalProjects);

router.get("/:id", PersonalProject.getPersonalProject);

router.use(authMiddleware.protect);

router.get("/userProjects", PersonalProject.getAllUserPersonalProjects);

router.post(
  "/",
  fileUploader.uploadPersonalProject,
  PersonalProject.createPersonalProject
);
router
  .route("/:id")
  .patch(
    fileUploader.uploadPersonalProject,
    PersonalProject.updatePersonalProject
  )
  .delete(PersonalProject.deletePersonalProject);

module.exports = router;
