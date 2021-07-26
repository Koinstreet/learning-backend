const express = require("express");


// NEW CONTROLLERS
const Message = require("../controllers/v1/chat_message");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const fileUploader = require("../middleware/fileUploaders");

const router = express.Router();

router.use(authMiddleware.protect);

router.get("/:id", Message.getAllMessages);

router.post("/", fileUploader.uploadChatImage, fileUploader.uploadChatVideo, Message.createMessage);

router.put("/", Message.seenMessage);

router.delete("/", Message.deleteMessage);

module.exports = router;