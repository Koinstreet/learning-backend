const express = require("express");

// Controllers
const authController = require("../controllers/authController");
const courseController = require("../controllers/courseController");
const moduleController = require("../controllers/moduleController");

const router = express.Router();

router.get("/", courseController.getPublishedCourse);

router.get("/:id", courseController.getCourse);
router.get("/:courseId/module", moduleController.getCourseAllModule);

router.use(authController.protect);

router.get("/:courseId/module/:moduleId", moduleController.getModule);
router.get("/user/viewed", moduleController.getViewedCourses);

router.use(authController.restrictTo("admin"));

router.get("/admin/courses", courseController.getAllCourse);

router.post(
  "/",
  courseController.uploadCourseImage,
  courseController.createCourse
);
router
  .route("/:id")
  .put(courseController.uploadCourseImage, courseController.updateCourse)
  .delete(courseController.deletCourse);

router
  .route("/:courseId/module")
  .post(moduleController.uploadModuleVideo, moduleController.createModule)
  // .get(moduleController.getCourseAllModule);

router
  .route("/:courseId/module/:id")
  .put(moduleController.updateModule)
  .delete(moduleController.deleteModule);

module.exports = router;
