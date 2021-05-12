const express = require("express");


// NEW CONTROLLERS
const startup = require("../controllers/v1/startup");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const fileUploader = require("../middleware/fileUploaders");

const router = express.Router();

router.get("/", startup.getAllStartup);

router.get("/:id", startup.getStartup);

router.use(authMiddleware.protect);

router.post(
  "/",
  fileUploader.uploadStartupImage,
  startup.createStartup
);
router
  .route("/:id")
  .put(fileUploader.uploadStartupImage, startup.updateStartup)
  .delete(startup.deleteStartup);

module.exports = router;
