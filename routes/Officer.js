let router = require('express').Router();
let Officer = require('../model/Officer');

// Get all Officer
router.route('/').get((req, res) => {
	Officer.findAll()
		.then((officer) => res.json(officer))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Find Officer by Id
router.route('/:id').get((req, res) => {
	Officer.findById(req.params.id)
		.then((officer) => res.json(officer))
		.catch((err) => res.status(400).json('EError: ' + err));
});

// Add Officer
router.route('/add').post((req, res) => {
	const bio = req.body.bio;
	const officer_role = req.body.officer_role;

	const newOfficer = new Officer({
		bio,
		officer_role,
	});

	newOfficer.save().then(() => res.json('Officer Added!'));
});

// Delete by id
router.route('/:id').delete((req, res) => {
	Officer.findByIdandDelete(req.params.id).then(() =>
		res.json('Officer deleted.'),
	);
});

// Update Officer by Id
router.route('/update/:id').post((req, res) => {
	Officer.findById(req.params.id)
		.then((officer) => {
			officer.bio = req.body.bio;
			officer.officer_role = req.body.officer_role;

			officer.save().catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
