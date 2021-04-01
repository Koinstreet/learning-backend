const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
	programmer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Programmer',
	},
	skills: {
		type: [String],
	},
	profficiency: {
		type: String,
		enum: ['basic', 'intermediate', 'advanced'],
		trim: true,
	},
	details: {
		type: String,
		trim: true,
	},
	test_metadata: {
		type: String,
		trim: true,
	},
	created_at: {
		type: Date,
	},
	updated_at: {
		type: Date,
		default: Date.now, //Current timestamp
	},
});

module.exports = mongoose.model('Skill', skillSchema);
