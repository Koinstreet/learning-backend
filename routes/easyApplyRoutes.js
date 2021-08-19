const express = require("express");


// NEW CONTROLLERS
const easyApply = require("../controllers/v1/easyApply");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const fileUploader = require("../middleware/fileUploaders");

const router = express.Router();

router.use(authMiddleware.protect);

router.get("/userApplied", easyApply.getAllUserEasyApplies);
router.get("/:id", easyApply.getEasyApply);
router.get("/", easyApply.getAllEasyApplied);

router.post(
  "/",
  fileUploader.uploadResume,
  easyApply.createEasyApply
);
router
  .route("/:id")
  .patch(fileUploader.uploadResume, easyApply.updateEasyApply)
  .delete(easyApply.deleteEasyApply);

module.exports = router;
