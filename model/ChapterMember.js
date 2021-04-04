const mongoose = require('mongoose');

const chapterMemberSchema = new mongoose.Schema({
	programmer_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	chapter_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Chapter',
	},
});

module.exports = mongoose.model('ChapterMember', chapterMemberSchema);
