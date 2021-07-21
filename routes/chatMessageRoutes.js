const express = require("express");


// NEW CONTROLLERS
const Message = require("../controllers/v1/chat_message");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

router.get("/:id", Message.getAllMessages);

router.post("/", Message.createMessage);

router.put("/", Message.seenMessage);

module.exports = router;