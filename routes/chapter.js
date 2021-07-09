const express = require('express');

// NEW CONTROLLER
const chapter = require("../controllers/v1/chapter");
// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", chapter.getAllChapter);

router.get("/:id", chapter.getChapter);

router.use(authMiddleware.protect);

router.post("/", chapter.createChapter);

router
  .route("/:id")
  .patch(chapter.updateChapter)
  .delete(chapter.deleteChapter);

module.exports = router;