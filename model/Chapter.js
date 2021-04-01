const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
	full_name: {
		type: String,
		trim: true,
	},
	abbreviation: {
		type: String,
		trim: true,
	},
	location: {
		type: String,
		trim: true,
	},
	logo: {
		type: String,
		trim: true,
	},
	picture: {
		type: String,
		trim: true,
	},
	is_deleted: {
		type: Number,
	},
	created_at: {
		type: Date,
	},
	updated_at: {
		type: Date,
		default: Date.now, //Current timestamp
	},
});

module.exports = mongoose.model('Chapter', chapterSchema);
