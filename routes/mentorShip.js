const express = require("express");

// NEW CONTROLLERS
const mentorship = require("../controllers/v1/mentorship");
const workshop = require("../controllers/v1/workshop");
const capstone = require("../controllers/v1/capstone");
const mentorshipJob = require("../controllers/v1/mentorshipJob");
const resources = require("../controllers/v1/resources");
const sprint = require("../controllers/v1/sprint");
const mentorshipCourse = require("../controllers/v1/mentorshipCourse");
const mentorshipEvents = require("../controllers/v1/mentorshipEvents");
// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protect);

router.post("/", mentorship.createMentorship);
router.get("/", mentorship.getAllMentorship);
// workshop get All
router.get("/workshop", workshop.getAllWorkshop);
// capstone get All
router.get("/capstone", capstone.getAllCapstone);
// MentorshipJob get All
router.get("/job", mentorshipJob.getAllMentorshipJobs);
// Resource get All
router.get("/resource", resources.getAllResources);
// Sprint get All
router.get("/sprint", sprint.getAllSprint);
// MentorshipCourse get All
router.get("/course", mentorshipCourse.getAllMentorshipCourse);
// MentorshipEvent get All
router.get("/event", mentorshipEvents.getAllMentorshipEvent);

//Mentorship
router.get("/:id", mentorship.getMentorship);
router
  .route("/:id")
  .patch(mentorship.updateMentorship)
  .delete(mentorship.deleteMentorship);

// workshop
router.post("/workshop/:mentorship_id", workshop.createWorkshop);
router.get("/workshop/:mentorship_id", workshop.getWorkshop);
router
  .route("/workshop/:workshop_id")
  .patch(workshop.updateWorkshop)
  .delete(workshop.deleteWorkshop);

// capstone
router.post("/capstone/:mentorship_id", capstone.createCapstone);
router.get("/capstone/:mentorship_id", capstone.getCapstone);
router
  .route("/capstone/:capstone_id")
  .patch(capstone.updateCapstone)
  .delete(capstone.deleteCapstone);

// MentorshipJob
router.post("/job/:mentorship_id", mentorshipJob.createMentorshipJob);
router.get("/job/:mentorship_id", mentorshipJob.getMentorshipJob);
router
  .route("/job/:job_id")
  .patch(mentorshipJob.updateMentorshipJob)
  .delete(mentorshipJob.deleteMentorshipJob);

// Resource
router.post("/resource/:mentorship_id", resources.createResource);
router.get("/resource/:mentorship_id", resources.getResource);
router
  .route("/resource/:resource_id")
  .patch(resources.updateResource)
  .delete(resources.deleteResource);

// Sprint
router.post("/sprint/:mentorship_id", sprint.createSprint);
router.get("/sprint/:mentorship_id", sprint.getSprint);
router
  .route("/sprint/:sprint_id")
  .patch(sprint.updateSprint)
  .delete(sprint.deleteSprint);

// MentorshipCourse
router.post("/course/:mentorship_id", mentorshipCourse.createMentorshipCourse);
router.get("/course/:mentorship_id", mentorshipCourse.getMentorshipCourse);
router
  .route("/course/:course_id")
  .patch(mentorshipCourse.updateMentorshipCourse)
  .delete(mentorshipCourse.deleteMentorshipCourse);

// MentorshipEvent
router.post("/event/:mentorship_id", mentorshipEvents.createMentorshipEvent);
router.get("/event/:mentorship_id", mentorshipEvents.getMentorshipEvent);
router
  .route("/event/:event_id")
  .patch(mentorshipEvents.updateMentorshipEvent)
  .delete(mentorshipEvents.deleteMentorshipEvent);

router.use(authMiddleware.restrictTo("admin"));

module.exports = router;
