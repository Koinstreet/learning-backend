const express = require("express");


// NEW CONTROLLERS
const jobs = require("../controllers/v1/jobs");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", jobs.getAllJobs);

router.get("/:id", jobs.getJob);

router.use(authMiddleware.protect);

router.post(
  "/",
  jobs.createJob
);
router
  .route("/:id")
  .patch(jobs.updateJob)
  .delete(jobs.deleteJob);


module.exports = router;
