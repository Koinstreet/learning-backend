let router = require('express').Router();
let Projects = require('../model/Projects');

// Get all Projects
router.route('/').get((req, res) => {
	Projects.findAll()
		.then((projects) => res.json(projects))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Find Projects by Id
router.route('/:id').get((req, res) => {
	Projects.findById(req.params.id)
		.then((projects) => res.json(projects))
		.catch((err) => res.status(400).json('EError: ' + err));
});

// Add Projects
router.route('/add').post((req, res) => {
	const requirements = req.body.requirements;
	const likelihood_to_hire = req.body.likelihood_to_hire;
	const tech_stack = req.body.tech_stack;
	const type_of_business = req.body.type_of_business;
	const industry_of_business = req.body.industry_of_business;
	const deployment_deadline = req.body.deployment_deadline;
	const estimated_budget_range = req.body.estimated_budget_range;
	const additional_details = req.body.additional_details;

	const newProjects = new Projects({
		requirements,
		likelihood_to_hire,
		tech_stack,
		type_of_business,
		industry_of_business,
		deployment_deadline,
		estimated_budget_range,
		additional_details,
	});

	// requirements
	// likelihood_to_hire
	// tech_stack
	// type_of_business
	// industry_of_business
	// deployment_deadline
	// estimated_budget_range
	// additional_details

	newProjects.save().then(() => res.json('Projects Added!'));
});

// Delete by id
router.route('/:id').delete((req, res) => {
	Projects.findByIdandDelete(req.params.id).then(() =>
		res.json('Projects deleted.'),
	);
});

// Update Projects by Id
router.route('/update/:id').post((req, res) => {
	Projects.findById(req.params.id)
		.then((projects) => {
			projects.requirements = req.body.requirements;
			projects.likelihood_to_hire = req.body.likelihood_to_hire;
			projects.requirements = req.body.requirements;
			projects.likelihood_to_hire = req.body.likelihood_to_hire;
			projects.tech_stack = req.body.tech_stack;
			projects.type_of_business = req.body.type_of_business;
			projects.industry_of_business = req.body.industry_of_business;
			projects.deployment_deadline = req.body.deployment_deadline;
			projects.estimated_budget_range = req.body.estimated_budget_range;
			projects.additional_details = req.body.additional_details;

			projects.save().catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
