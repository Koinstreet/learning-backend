const express = require('express');

// NEW CONTROLLER
const proposal = require("../controllers/v1/proposal");
// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const proposalMiddleware = require('../middleware/fileUploaders');

const router = express.Router();

router.get("/", proposal.getAllProposals);

router.get("/:id", proposal.getProposal);

router.use(authMiddleware.protect);

router.post(
  "/",
  proposalMiddleware.uploadProposalAvatar,
  proposal.createProposal
);

router
  .route("/:id")
  .patch(proposalMiddleware.uploadProposalAvatar, proposal.updateProposal)
  .delete(proposal.deleteProposal);

module.exports = router;