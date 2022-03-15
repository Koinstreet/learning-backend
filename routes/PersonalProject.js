const express = require("express");

// NEW CONTROLLERS
const PersonalProject = require("../controllers/v1/personalProject");

const fileUploader = require("../middleware/fileUploaders");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", PersonalProject.getAllPersonalProjects);

router.get(
  "/PersonalProjectById/:id",
  PersonalProject.getAllPersonalProjectById
);

router.use(authMiddleware.protect);

router.get("/userPersonalProject", PersonalProject.getAllUserPersonalProjects);

router.get("/:id", PersonalProject.getPersonalProject);

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
