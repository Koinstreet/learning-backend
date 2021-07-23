const express = require("express");


// NEW CONTROLLERS
const Chat = require("../controllers/v1/chat");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const socketMiddleware = require("../middleware/socket");

const router = express.Router();

router.use(authMiddleware.protect);

router.use(socketMiddleware.handleSocket);

// ROUTES

router.get("/", Chat.getAllChats);

router.get("/pending", Chat.getPendingChats);

router.get("/block", Chat.getBlockedChats);

router.get("/:id", Chat.getChat);

router.post("/", Chat.createChat);

router.put("/", Chat.acceptChat);

router.put("/block", Chat.setBlockStatus);

module.exports = router;