const express = require('express');

// NEW CONTROLLER
const Upvote = require("../controllers/v1/upVotes");
// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", Upvote.getAllUpVotes);

router.get("/:id", Upvote.getUpVote);

router.get("/startupUpvote", Upvote.getStartupUpVotes);

router.get("/proposalUpvote", Upvote.getProposalUpVotes);

router.use(authMiddleware.protect);

router.get("/userUpvotes", Upvote.getUserUpVotes);

router.post(
  "/",
  Upvote.createUpVotes
);

router
  .route("/:id")
  .patch(Upvote.updateUpVotes)
  .delete(Upvote.deleteUpVotes);

module.exports = router;