const express = require("express");

// NEW CONTROLLERS
const sprint = require("../controllers/v1/sprint");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

router.post("/", sprint.createSprint);
router.get("/", sprint.getAllSprint);
router.get("/:id", sprint.getSprint);
router
  .route("/:id")
  .patch(sprint.updateSprint)
  .delete(sprint.deleteSprint);

router.use(authMiddleware.restrictTo("admin"));

module.exports = router;
