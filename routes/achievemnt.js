const express = require("express");

// NEW CONTROLLERS
const achievement = require("../controllers/v1/achievements");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", achievement.getAllAchievement);

router.use(authMiddleware.protect);

router.get("/userAchievement", achievement.getAllUserAchievement);

router.get("/:id", achievement.getAchievement);

router.post("/", achievement.createAchievement);
router
  .route("/:id")
  .patch(achievement.updateAchievement)
  .delete(achievement.deleteAchievement);

module.exports = router;
