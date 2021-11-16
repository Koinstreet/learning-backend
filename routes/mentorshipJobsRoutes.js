const express = require("express");

// NEW CONTROLLERS
const mentorshipJob = require("../controllers/v1/mentorshipJob");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

router.post("/", mentorshipJob.createMentorshipJob);
router.get("/", mentorshipJob.getAllMentorshipJobs);
router.get("/:id", mentorshipJob.getMentorshipJob);
router
  .route("/:id")
  .patch(mentorshipJob.updateMentorshipJob)
  .delete(mentorshipJob.deleteMentorshipJob);

router.use(authMiddleware.restrictTo("admin"));

module.exports = router;
