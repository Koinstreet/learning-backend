let router = require('express').Router();
let ChapterMember = require('../model/ChapterMember');

// Get all Chapter Member
router.route('/').get((req, res) => {
	ChapterMember.findAll()
		.then((chapterMember) => res.json(chapterMember))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Find by Id
router.route('/:id').get((req, res) => {
	ChapterMember.findById(req.params.id)
		.then((chapterMember) => res.json(chapterMember))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Add Chapter Member
router.route('/add').post((req, res) => {
	const programmer_id = req.body.programmer_id;
	const chapter_id = req.body.chapter_id;

	const newChapterMember = new ChapterMember({
		programmer_id,
		chapter_id,
	});

	newChapterMember
		.save()
		.then(() => res.json('Chapter Member added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// Delete by id
router.route('/:id').delete((req, res) => {
	ChapterMember.findByIdAndDelete(req.params.id).then(() =>
		res.json('Chapter Member Member deleted.'),
	);
});

// Update ChapterMember by Id
router.route('/update/:id').post((req, res) => {
	ChapterMember.findById(req.params.id)
		.then((chapterMember) => {
			chapterMember.programmer_id = req.body.programmer_id;
			chapterMember.chapter_id = req.body.chapter_id;

			chapterMember
				.save()
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
