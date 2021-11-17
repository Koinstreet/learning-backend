const express = require("express");

const SuggestionsController = require("../controllers/v1/Suggestions");

const router = express.Router();

router.get('/', SuggestionsController.SuggestionsGet);


module.exports = router;