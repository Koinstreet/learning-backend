let router = require('express').Router();
let Passion = require('../model/Passion');

// Get all  Passion
router.route('/').get((req, res) => {
	Passion.findAll()
		.then((passion) => res.json(passion))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Find by Id
router.route('/:id').get((req, res) => {
	Passion.findById(req.params.id)
		.then((passion) => res.json(passion))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Add  Passion
router.route('/add').post((req, res) => {
	const passion = req.body.passion;

	const newPassion = new Passion({
		passion,
	});

	newPassion
		.save()
		.then(() => res.json(' Passion added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Delete by id
router.route('/:id').delete((req, res) => {
	Passion.findByIdAndDelete(req.params.id).then(() =>
		res.json(' Passion deleted.'),
	);
});

// Update Passsion by Id
router.route('/update/:id').post((req, res) => {
	Passion.findById(req.params.id)
		.then((passion) => {
			passion.passion = req.body.passion;

			passion.save().catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
