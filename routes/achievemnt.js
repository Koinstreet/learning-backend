const express = require("express");

// NEW CONTROLLERS
const Achievement = require("../controllers/v1/achievements");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", Achievement.getAllAchievement);

router.get("/:id", Achievement.getAchievement);

router.use(authMiddleware.protect);

router.get("/userAchievements", Achievement.getAllUserAchievement);

router.post("/", Achievement.createAchievement);
router
  .route("/:id")
  .patch(Achievement.updateAchievement)
  .delete(Achievement.deleteAchievement);

module.exports = router;
