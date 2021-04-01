const express = require('express');
let router = express.Router();

const Testimonial = require('../models/Testimonial');

// Get all Testimonials
router.route('/').get((req, res) => {
	Testimonial.findAll()
		.then((Testimonial) => res.json(Testimonial))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Find Testimonial by Id
router.route('/:id').get((req, res) => {
	Testimonial.findById(req.params.id)
		.then((Testimonial) => res.json(chapter))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Add Testimonial
router.route('/add').post((req, res) => {
	const name = req.body.name;
	const testimonial = req.body.testimonial;
	const profile_pic = req.body.profile_pic;
	const display_on_web = req.body.display_on_web;

	const newTestimonial = new Testimonial({
		name,
		testimonial,
		profile_pic,
		display_on_web,
	});

	newTestimonial
		.save()
		.then(() => res.json('Testimonial Added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Delete by id
router.route('/:id').delete((req, res) => {
	Testimonial.findByIdAndDelete(req.params.id).then(() =>
		res.json('Teestimonial deleted.'),
	);
});

// Update Testimonial by Id
router.route('/update/:id').post((req, res) => {
	Testimonial.findById(req.params.id)
		.then((testimonial) => {
			testimonial.name = req.body.name;
			testimonial.testimonial = req.body.testimonial;
			testimonial.profile_pic = req.body.profile_pic;
			testimonial.display_on_web = req.body.display_on_web;

			testimonial.save().catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
