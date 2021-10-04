const express = require("express");


// NEW CONTROLLERS
const proposalView = require("../controllers/v1/proposalView");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

router.get("/userProposalView", proposalView.getAllUserViewedPropopsals);
router.get("/", proposalView.getAllViewedProposals);

router.post(
  "/",
  proposalView.createProposalView
);

router
  .route("/:id")
  .delete(proposalView.deleteProposalView);

module.exports = router;
