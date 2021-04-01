let router = require('express').Router();
let Chapter = require('../models/Chapter');

// Get all Chapter
router.route('/').get((req, res) => {
	Chapter.findAll()
		.then((Chapter) => res.json(Chapter))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Find by Id
router.route('/:id').get((req, res) => {
	Chapter.findById(req.params.id)
		.then((chapter) => res.json(chapter))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Add Chapter
router.route('/add').post((req, res) => {
	const full_name = req.body.full_name;
	const abbreviation = req.body.abbreviation;
	const location = req.body.location;
	const logo = req.body.logo;
	const picture = req.body.picture;

	const newChapter = new Chapter({
		full_name,
		abbreviation,
		location,
		logo,
		picture,
	});

	newChapter
		.save()
		.then(() => res.json('Chapter added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Delete by id
router.route('/:id').delete((req, res) => {
	Chapter.findByIdAndDelete(req.params.id).then(() =>
		res.json('Chapter deleted.'),
	);
});

// Update Chapterby Id
router.route('/update/:id').post((req, res) => {
	Chapter.findById(req.params.id)
		.then((chapter) => {
			chapter.full_name = req.body.full_name;
			chapter.abbreviation = req.body.abbreviation;
			chapter.location = req.body.location;
			chapter.logo = req.body.logo;
			chapter.picture = req.body.picture;

			chapter.save().catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
