const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
	programmer_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	bio: {
		type: String,
		trim: true,
	},
	officer_role: {
		type: String,
		trim: true,
	},
	start_term: {
		type: Date,
	},
	end_term: {
		type: Date,
	},
	chapter_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Chapter',
	},
});

module.exports = mongoose.model('Officer', officerSchema);
