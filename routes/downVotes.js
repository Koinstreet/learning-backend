const express = require('express');

// NEW CONTROLLER
const Downvote = require("../controllers/v1/downvote.js");
// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/startupDownvote/:id", authMiddleware.protect, Downvote.getStartDownVotes);

router.get("/proposalDownvote/:id", authMiddleware.protect, Downvote.getProposalDownVotes);

router.get("/userDownvotes", authMiddleware.protect, Downvote.getUserDownVotes);

router.get("/", Downvote.getAllDownVotes);

router.get("/:id", Downvote.getDownVote);

router.post(
  "/",authMiddleware.protect,
  Downvote.createDownVotes
);

router
  .route("/:id")
  .patch(authMiddleware.protect, Downvote.updateDownVotes)
  .delete(authMiddleware.protect, Downvote.deleteDownVotes);

module.exports = router;