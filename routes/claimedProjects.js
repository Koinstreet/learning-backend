const express = require("express");


// NEW CONTROLLERS
const claimedProject = require("../controllers/v1/claimProject");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

router.get("/userClaimed", claimedProject.getAllUserClaimedProjects);
router.get("/:id", claimedProject.getclaimedProject);
router.get("/", claimedProject.getAllclaimedProject);

router.post(
  "/",
  claimedProject.claimProject
);
router
  .route("/:id")
  .patch(claimedProject.updateclaimedProject)
  .delete(claimedProject.deleteclaimedProject);

module.exports = router;
