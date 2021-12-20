const express = require("express");

// NEW CONTROLLER
const reputation = require("../controllers/v1/reputation");
// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get(
  "/userReputations",
  authMiddleware.protect,
  reputation.getUserReputations
);

router.get("/", authMiddleware.protect, reputation.getAllReputationss);

router.get("/:id", authMiddleware.protect, reputation.getReputation);

// reputation replies

router.use(authMiddleware.protect);

router.route("/:id").delete(reputation.deleteReputations);

module.exports = router;
