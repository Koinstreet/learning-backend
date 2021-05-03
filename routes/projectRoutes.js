const express = require("express");


// NEW CONTROLLERS
const project = require("../controllers/v1/project");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", project.getAllProjects);

router.get("/:id", project.getProject);

router.use(authMiddleware.protect);

router.post(
  "/",
  project.createproject
);
router
  .route("/:id")
  .put(project.updateProject)
  .delete(project.deleteProject);


module.exports = router;
