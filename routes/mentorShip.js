const express = require("express");


// NEW CONTROLLERS
const mentorship = require("../controllers/v1/mentorship");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/:id", mentorship.getMentorship);

router.use(authMiddleware.protect);

router.post(
  "/",
  mentorship.createMentorship
);
router
  .route("/:id")
  .patch(mentorship.updateMentorship)
  .delete(mentorship.deleteMentorship);

router.use(authMiddleware.restrictTo("admin"));

router.get("/", mentorship.getAllMentorship);

module.exports = router;
