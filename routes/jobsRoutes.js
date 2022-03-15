const express = require("express");


// NEW CONTROLLERS
const jobs = require("../controllers/v1/jobs");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();


router.get("/userJobs",authMiddleware.protect, jobs.getUserJobs);
router.get("/candidates",authMiddleware.protect, jobs.getCandidates);



router.post(
  "/",authMiddleware.protect,
  jobs.createJob
);
router
  .route("/:id")
  .patch(authMiddleware.protect, jobs.updateJob)
  .delete(authMiddleware.protect, jobs.deleteJob);


router.post("/search", jobs.getSearch);

router.get("/", jobs.getAllJobs);

router.get("/:id", jobs.getJob);


module.exports = router;
