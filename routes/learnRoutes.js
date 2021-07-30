const express = require("express");


// NEW CONTROLLERS
const EnrolledCourse = require("../controllers/v1/enrolledCourses/index");
const UserModule = require("../controllers/v1/userModules/index");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

// courses
router.get("/userCourses", EnrolledCourse.getUserEnrolledCourse);

router.post(
    "/",
    EnrolledCourse.createEnrolledCourse
  );

router.get("/:id", EnrolledCourse.getEnrolledCourse);

router
.route("/:id")
.patch(EnrolledCourse.updateEnrolledCourse)
.delete(EnrolledCourse.deleteEnrolledCourse);

// modules
router.get("/:courseId/userModules", UserModule.getUserUserModules);
router.get("/:courseId/:id", UserModule.getUserModule);
router.post(
    "/:courseId/module",
    UserModule.createUserModule
);
router
.route("/:courseId/:moduleId/:id")
.patch(UserModule.updateUserModules)
.delete(UserModule.deleteUserModule);

router.use(authMiddleware.restrictTo("admin"));

router.get("/", EnrolledCourse.getAllEnrolledCourse);


module.exports = router;