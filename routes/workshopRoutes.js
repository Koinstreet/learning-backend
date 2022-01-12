const express = require("express");

// NEW CONTROLLERS
const workshop = require("../controllers/v1/workshop");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

router.post("/", workshop.createWorkshop);
router.get("/", workshop.getAllWorkshop);
router.get("/:id", workshop.getWorkshop);
router
  .route("/:id")
  .patch(workshop.updateWorkshop)
  .delete(workshop.deleteWorkshop);

router.use(authMiddleware.restrictTo("admin"));

module.exports = router;
