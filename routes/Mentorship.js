let router = require('express').Router();
let Mentorship = require('../model/Mentorship');

// Get all Mentorships
router.route('/').get((req, res) => {
	Mentorship.findAll()
		.then((Mentorship) => res.json(Mentorship))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Find Mentorship by Id
router.route('/:id').get((req, res) => {
	Mentorship.findById(req.params.id)
		.then((mentorship) => res.json(menthorship))
		.catch((err) => res.status(400).json('EError: ' + err));
});

// Add Mentorship
router.route('/add').post((req, res) => {
	const is_mentor = req.body.is_mentor;
	const is_mentee = req.body.is_mentee;

	const newMentorship = new Mentorship({
		is_mentor,
		is_mentee,
	});

	newMentorship.save().then(() => res.json('Mentorship Added!'));
});

// Delete by id
router.route('/:id').delete((req, res) => {
	Mentorship.findByIdandDelete(req.params.id).then(() =>
		res.json('Mentorship deleted.'),
	);
});

// Update Mentorship by Id
router.route('/update/:id').post((req, res) => {
	Mentorship.findById(req.params.id)
		.then((mentorship) => {
			mentorship.isMentor = req.body.is_mentor;
			mentorship.is_mentee = req.body.is_mentee;

			mentorship.save().catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
