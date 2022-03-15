const express = require("express");


// NEW CONTROLLERS
const Chat = require("../controllers/v1/chat");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

// ROUTES

router.get("/", Chat.getAllChats);

router.get("/pending", Chat.getPendingChats);

router.get("/block", Chat.getBlockedChats);

router.get("/search/:query", Chat.searchChats);

router.get("/:id", Chat.getChat);

router.post("/", Chat.createChat);

router.put("/", Chat.acceptChat);

router.delete("/:id", Chat.deleteChat);

router.put("/block", Chat.setBlockStatus);

module.exports = router;