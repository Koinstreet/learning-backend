let router = require('express').Router();
let CompanyRelationships = require('../model/CompanyRelationships');

// Get all Company Relationships
router.route('/').get((req, res) => {
	CompanyRelationships.findAll()
		.then((companyRelationships) => res.json(companyRelationships))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Find by Id
router.route('/:id').get((req, res) => {
	CompanyRelationships.findById(req.params.id)
		.then((companyRelationships) => res.json(companyRelationships))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Add Company Relationships
router.route('/add').post((req, res) => {
	const relation = req.body.relation;

	const newCompanyRelationships = new CompanyRelationships({
		relation,
	});

	newCompanyRelationships
		.save()
		.then(() => res.json('Company Relationships added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Delete by id
router.route('/:id').delete((req, res) => {
	CompanyRelationships.findByIdAndDelete(req.params.id).then(() =>
		res.json('Company Relationships deleted.'),
	);
});

// Update Company Relationships by Id
router.route('/update/:id').post((req, res) => {
	CompanyRelationships.findById(req.params.id)
		.then((companyRelationships) => {
			companyRelationships.relation = req.body.relation;

			companyRelationships
				.save()
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
