const express = require("express");


// NEW CONTROLLERS
const location = require("../controllers/v1/location");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const fileUploader = require("../middleware/fileUploaders");

const router = express.Router();

router.get("/", location.getAllLocations);
router.get("/:id", location.getLocation);

router.use(authMiddleware.protect);
router.post(
    "/",
    fileUploader.uploadLocationLogo,
    location.createLocation
  );
router
  .route("/:id")
  .patch(fileUploader.uploadLocationLogo, location.updateLocation)
  .delete(location.deleteLocation);

module.exports = router;
