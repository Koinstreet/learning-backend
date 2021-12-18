const express = require("express");

// NEW CONTROLLERS
const mentor = require("../controllers/v1/mentor");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const fileUploader = require("../middleware/fileUploaders");

const router = express.Router();

router.get("/", mentor.getAllMentors);

router.get("/:id", mentor.getMentor);

router.use(authMiddleware.protect);

router.post("/", mentor.createMentor);
router
  .route("/:id")
  .patch(mentor.updateMentor)
  .delete(mentor.deleteMentor);

module.exports = router;
