const express = require("express");


// NEW CONTROLLERS
const Funded = require("../controllers/v1/funded");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

router.get("/userFunded", Funded.getUserFund);

router.get("/:id", Funded.getFund);

router.post(
  "/",
  Funded.createFund
);
router
  .route("/:id")
  .patch(Funded.updateFund)
  .delete(Funded.deleteFund);

router.use(authMiddleware.restrictTo("admin"));

router.get("/", Funded.getAllFund);

module.exports = router;
