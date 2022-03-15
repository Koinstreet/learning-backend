const express = require("express");


// NEW CONTROLLERS
const SavedEvents = require("../controllers/v1/saved_events");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", SavedEvents.getAllSavedEvents);

router.use(authMiddleware.protect);
router.get("/userEvents", SavedEvents.getUserEvents);

router.get("/:id", SavedEvents.getSavedEvents);

router.post(
  "/",
  SavedEvents.createSavedEvents
);
router
  .route("/:id")
  .patch(SavedEvents.updateSavedEvents)
  .delete(SavedEvents.deleteSavedEvents);


module.exports = router;
