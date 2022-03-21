const express = require("express");

// NEW CONTROLLERS
const joinChapter = require("../controllers/v1/joinChapter");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

router.get("/userJoinedRequests", joinChapter.getUserJoinRequests);

router.get("/", joinChapter.getAllJoinedChapter);

router.get("/:id", joinChapter.getJoinedChapter);
router.get("/location/:id", joinChapter.getChapterUsers);

router.post("/accept/:id", joinChapter.acceptJoinRequest);

router.post("/", joinChapter.createJoinChapter);
router
  .route("/:id")
  .patch(joinChapter.updateJoinedChapter)
  .delete(joinChapter.deleteJoinedChapter);

module.exports = router;
