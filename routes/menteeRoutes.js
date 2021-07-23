const express = require("express");


// NEW CONTROLLERS
const mentee = require("../controllers/v1/mentee");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", mentee.getAllMentee);

router.get("/:id", mentee.getMentee);

router.use(authMiddleware.protect);

router.post(
  "/",
  mentee.createMentee
);
router
  .route("/:id")
  .patch(mentee.updateMentee)
  .delete(mentee.deleteMentee);


module.exports = router;
