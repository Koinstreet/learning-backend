const express = require('express');

// NEW CONTROLLER
const Notifications = require("../controllers/v1/notifications");
// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/userNotifications", authMiddleware.protect,  Notifications.getUserNotifications);

router.get("/", authMiddleware.protect, Notifications.getAllNotificationss);

router.get("/:id",  authMiddleware.protect, Notifications.getNotification);

// Notifications replies

router.use(authMiddleware.protect);

router
  .route("/:id")
  .get(Notifications.ReadNotifications)
  .delete(Notifications.deleteNotifications);

module.exports = router;