const express = require("express");

// NEW CONTROLLER
const certificate = require("../controllers/v1/certificate");
// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/courseCertificates/:courseId", certificate.getCourseCertificate);

router.use(authMiddleware.protect);
router.post("/", certificate.uploadCertificate);
router.get("/getUserCertificate", certificate.getUserCertificate);
// router.post("/", certificate.working)
router.delete("/:id", certificate.deleteCertificate);

router.use(authMiddleware.restrictTo("admin"));
router.get("/", certificate.getAllCertificates);

module.exports = router;
