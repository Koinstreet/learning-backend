const express = require("express");

// NEW CONTROLLERS
const mentorshipEvent = require("../controllers/v1/mentorshipEvents");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

router.post("/", mentorshipEvent.createMentorshipEvent);
router.get("/", mentorshipEvent.getAllMentorshipEvent);
router.get("/:id", mentorshipEvent.getMentorshipEvent);
router
  .route("/:id")
  .patch(mentorshipEvent.updateMentorshipEvent)
  .delete(mentorshipEvent.deleteMentorshipEvent);

router.use(authMiddleware.restrictTo("admin"));

module.exports = router;
