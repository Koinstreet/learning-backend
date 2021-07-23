const express = require("express");


// NEW CONTROLLERS
const joinChapter = require("../controllers/v1/joinChapter");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", joinChapter.getAllJoinedChapter);

router.get("/:id", joinChapter.getJoinedChapter);

router.use(authMiddleware.protect);

router.get("/:location/accept/:id", joinChapter.acceptJoinRequest);

router.post(
  "/",
  joinChapter.createJoinChapter
);
router
  .route("/:id")
  .put(joinChapter.updateJoinedChapter)
  .delete(joinChapter.deleteJoinedChapter);


module.exports = router;
