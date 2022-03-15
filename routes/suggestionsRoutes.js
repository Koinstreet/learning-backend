const express = require("express");

const SuggestionsController = require("../controllers/v1/Suggestions");

const router = express.Router();

router.get('/mentors/:id', SuggestionsController.SuggestionsMentorsGet);
router.get('/mentes/:id', SuggestionsController.SuggestionsMentesGet);
router.get('/courses/:id', SuggestionsController.SuggestionsCoursesGet);
router.get('/companies/:id', SuggestionsController.SuggestionsCompaniesGet);
router.get('/events/:id', SuggestionsController.SuggestionsEventsGet);
router.get('/jobs/:id', SuggestionsController.SuggestionsJobsGet);
router.get('/startups/:id', SuggestionsController.SuggestionsStartupsGet);
router.get('/users/:id', SuggestionsController.SuggestionsUsersGet);


module.exports = router;