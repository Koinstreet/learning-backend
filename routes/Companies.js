let router = require('express').Router();
let Companies = require('../model/Companies');

// Get all Companies
router.route('/').get((req, res) => {
	Companies.findAll()
		.then((companies) => res.json(companies))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Find by Id
router.route('/:id').get((req, res) => {
	Companies.findById(req.params.id)
		.then((companies) => res.json(companies))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Add Companies
router.route('/add').post((req, res) => {
	const description = req.body.description;
	const specialties = req.body.specialties;
	const relation_type = req.body.relation_type;
	const type_company = req.body.type_company;
	const size_company = req.body.size_company;
	const headquarters = req.body.headquarters;
	const total_dollars_given = req.body.total_dollars_given;

	const newCompanies = new Companies({
		description,
		specialties,
		relation_type,
		type_company,
		size_company,
		headquarters,
		total_dollars_given,
	});

	newCompanies
		.save()
		.then(() => res.json('Companies added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Delete by id
router.route('/:id').delete((req, res) => {
	Companies.findByIdAndDelete(req.params.id).then(() =>
		res.json('Companies Member deleted.'),
	);
});

// Update Companies by Id
router.route('/update/:id').post((req, res) => {
	Companies.findById(req.params.id)
		.then((companies) => {
			companies.description = req.body.description;
			companies.specialties = req.body.specialties;
			companies.relation_type = req.body.relation_type;
			companies.type_company = req.body.type_company;
			companies.size_company = req.body.size_company;
			companies.headquarters = req.body.headquarters;
			companies.total_dollars_given = req.body.total_dollars_given;

			companies.save().catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
