const express = require('express');

// NEW CONTROLLER
const proposal = require("../controllers/v1/proposal");
// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const proposalMiddleware = require('../middleware/fileUploaders');

const router = express.Router();

router.get("/userProposals",authMiddleware.protect,  proposal.getUserProposal);

router.get("/", proposal.getAllProposals);

router.get("/:id", proposal.getProposal);

// proposal replies

router.get("/:id/reply", proposal.getProposalReplies);

router.use(authMiddleware.protect);

router.post("/:id/reply",proposalMiddleware.uploadProposalAvatar, proposal.createReplies);

router.post(
  "/",
  proposalMiddleware.uploadProposalAvatar,
  proposal.createProposal
);

router
  .route("/:id")
  .patch(proposalMiddleware.uploadProposalAvatar, proposal.updateProposal)
  .delete(proposal.deleteProposal);

  router
  .route("/:proposalId/reply/:id")
  .patch(proposal.updateReplies)
  .delete(proposal.deleteReplies);

module.exports = router;