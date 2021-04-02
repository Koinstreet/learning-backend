const express = require('express');
let router = express.Router();

const SkillLevel = require('../model/SkillLevel');

// Get all SkillLevels
router.route('/').get((req, res) => {
	SkillLevel.findAll()
		.then((SkillLevel) => res.json(SkillLevel))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Find SkillLevel by Id
router.route('/:id').get((req, res) => {
	SkillLevel.findById(req.params.id)
		.then((skillLevel) => res.json(chapter))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Add SkillLevel
router.route('/add').post((req, res) => {
	const skills = req.body.skills;
	const profficiency = req.body.profficiency;
	const details = req.body.details;

	const newSkillLevel = new SkillLevel({
		skills,
		profficiency,
		details,
	});

	newSkillLevel
		.save()
		.then(() => res.json('SkillLevel Added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Delete by id
router.route('/:id').delete((req, res) => {
	SkillLevel.findByIdAndDelete(req.params.id).then(() =>
		res.json('Teestimonial deleted.'),
	);
});

// Update SkillLevel by Id
router.route('/update/:id').post((req, res) => {
	SkillLevel.findById(req.params.id)
		.then((skillLevel) => {
			skillLevel.skills = req.body.skills;
			skillLevel.profficiency = req.body.profficiency;
			skillLevel.details = req.body.details;

			skillLevel.save().catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
