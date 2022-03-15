const express = require("express");

// NEW CONTROLLERS
const mentorshipCourse = require("../controllers/v1/mentorshipCourse");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

router.post("/", mentorshipCourse.createMentorshipCourse);
router.get("/", mentorshipCourse.getAllMentorshipCourse);
router.get("/:id", mentorshipCourse.getMentorshipCourse);
router
  .route("/:id")
  .patch(mentorshipCourse.updateMentorshipCourse)
  .delete(mentorshipCourse.deleteMentorshipCourse);

router.use(authMiddleware.restrictTo("admin"));

module.exports = router;
