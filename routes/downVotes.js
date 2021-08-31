const express = require('express');

// NEW CONTROLLER
const Downvote = require("../controllers/v1/downvote.js");
// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", Downvote.getAllDownVotes);

router.get("/:id", Downvote.getDownVote);

router.get("/startup", Downvote.getStartupVotes);

router.get("/proposal", Downvote.getProposalDownVotes);

router.use(authMiddleware.protect);

router.get("/userDownvotes", Downvote.getUserDownVotes);

router.post(
  "/",
  Downvote.createDownVotes
);

router
  .route("/:id")
  .patch(Downvote.updateDownVotes)
  .delete(Downvote.deleteDownVotes);

module.exports = router;