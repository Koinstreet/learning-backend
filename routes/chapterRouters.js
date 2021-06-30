const express = require('express');

// NEW CONTROLLER
const chapter_stats = require("../controllers/v1/chapter_stats");
// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", chapter_stats.getAllChapterStats);

router.get("/:id", chapter_stats.getChapterStats);

router.use(authMiddleware.protect);

router.post("/", chapter_stats.createChapterStats);

router
  .route("/:id")
  .patch(chapter_stats.updateChapterStats)
  .delete(chapter_stats.deleteChapterStats);

module.exports = router;