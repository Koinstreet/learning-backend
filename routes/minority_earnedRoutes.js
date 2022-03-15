const express = require('express');

// NEW CONTROLLER
const minority_earned = require("../controllers/v1/minority_earned");
// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", minority_earned.getAllMinorityEarned);

router.get("/:id", minority_earned.getMinorityEarned);

router.use(authMiddleware.protect);

router.post("/", minority_earned.createMinorityEarned);

router
  .route("/:id")
  .patch(minority_earned.updateMinorityEarned)
  .delete(minority_earned.deleteMinorityEarned);

module.exports = router;