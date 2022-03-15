const express = require("express");


// NEW CONTROLLERS
const event = require("../controllers/v1/event");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const fileUploader = require("../middleware/fileUploaders");

const router = express.Router();

router.get("/", event.getAllEvents);
router.get("/:id", event.getEvent);

router.use(authMiddleware.protect);

router.post(
  "/",
  fileUploader.uploadEventImage,
  event.createEvent
);
router
  .route("/:id")
  .patch(fileUploader.uploadEventImage, event.updateEvent)
  .delete(event.deleteEvent);

module.exports = router;
