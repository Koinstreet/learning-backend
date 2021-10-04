const express = require("express");


// NEW CONTROLLERS
const ProposalStatus = require("../controllers/v1/proposalStatus");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);


router.get("/approvedProposal", ProposalStatus.getAllApprovedProposals);
router.get("/deniedProposal", ProposalStatus.getAllDeniedProposals);
router.get("/userApprovedProposal", ProposalStatus.getAllUserApprovedProposal);
router.get("/userDeniedProposal", ProposalStatus.getAllUserDeniedProposal);
router.get("/:id", ProposalStatus.getProposalStatus);
router.get("/", ProposalStatus.getAllProposalStatus);

router.use(authMiddleware.restrictTo("pm"));
router.post(
  "/",
  ProposalStatus.createProposalStatus
);

router
  .route("/:id")
  .patch(ProposalStatus.updateProposalStatus)
  .delete(ProposalStatus.deleteProposalStatus);

module.exports = router;

