const express = require("express");

// NEW CONTROLLERS
const capstone = require("../controllers/v1/capstone");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

router.post("/", capstone.createCapstone);
router.get("/", capstone.getAllCapstone);
router.get("/:id", capstone.getCapstone);
router
  .route("/:id")
  .patch(capstone.updateCapstone)
  .delete(capstone.deleteCapstone);

router.use(authMiddleware.restrictTo("admin"));

module.exports = router;
