const express = require("express");

// NEW CONTROLLERS
const resources = require("../controllers/v1/resources");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

router.post("/", resources.createResource);
router.get("/", resources.getAllResources);
router.get("/:id", resources.getResource);
router
  .route("/:id")
  .patch(resources.updateResource)
  .delete(resources.deleteResource);

router.use(authMiddleware.restrictTo("admin"));

module.exports = router;
