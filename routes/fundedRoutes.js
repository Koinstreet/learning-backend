const express = require("express");


// NEW CONTROLLERS
const Funded = require("../controllers/v1/funded");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", Funded.getAllFund);

router.get("/:id", Funded.getFund);

router.use(authMiddleware.protect);

router.post(
  "/",
  Funded.createFund
);
router
  .route("/:id")
  .patch(Funded.updateFund)
  .delete(Funded.deleteFund);


module.exports = router;
