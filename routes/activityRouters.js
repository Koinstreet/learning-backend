const express = require('express');

// NEW CONTROLLERS
const activity = require("../controllers/v1/activity");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const activityMiddleware = require("../middleware/fileUploaders");

const router = express.Router();

router.get('/', activity.getAllActivities);
router.get('/:id', activity.getActivity);


// router.use(authMiddleware.protect);

router.post(
    "/",
    activityMiddleware.uploadActivityImage,
    activity.createActivity
);

router
    .route("/:id")
    .patch(activityMiddleware.uploadActivityImage, activity.updateActivity)
    .delete(activity.deleteActivity);
    
module.exports = router;