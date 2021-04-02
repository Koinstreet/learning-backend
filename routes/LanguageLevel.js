let router = require('express').Router();
let LanguageLevel = require('../model/LanguageLevel');

// Get all Language Levels
router.route('/').get((req, res) => {
	LanguageLevel.findAll()
		.then((languageLevel) => res.json(languageLevel))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Find Language Level by Id
router.route('/:id').get((req, res) => {
	LanguageLevel.findById(req.params.id)
		.then((languageLevel) => res.json(languageLevel))
		.catch((err) => res.status(400).json('EError: ' + err));
});

// Add Language Level
router.route('/add').post((req, res) => {
	const officer_role = req.body.officer_role;
	const bio = req.body.bio;

	const newLanguageLevel = new LanguageLevel({
		officer_role,
		bio,
	});

	newLanguageLevel.save().then(() => res.json('Language Level Added!'));
});

// Delete by id
router.route('/:id').delete((req, res) => {
	LanguageLevel.findByIdandDelete(req.params.id).then(() =>
		res.json('Language Level deleted.'),
	);
});

// Update Language Level by Id
router.route('/update/:id').post((req, res) => {
	LanguageLevel.findById(req.params.id)
		.then((languageLevel) => {
			languageLevel.officer_role = req.body.officer_role;
			languageLevel.bio = req.body.bio;

			languageLevel
				.save()
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
