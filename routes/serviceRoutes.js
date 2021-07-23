const express = require("express");


// NEW CONTROLLERS
const service = require("../controllers/v1/service");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", service.getAllServices);

router.get("/:id", service.getService);

router.use(authMiddleware.protect);

router.post(
  "/",
  service.createService
);
router
  .route("/:id")
  .patch(service.updateService)
  .delete(service.deleteService);


module.exports = router;
