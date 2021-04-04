const mongoose = require('mongoose');

const companiesSchema = new mongoose.Schema({
	description: {
		type: String,
		trim: true,
	},
	specialties: {
		type: String,
		trim: true,
	},
	started_at: {
		type: Date,
	},
	mpa_relationship_started: {
		type: Date,
	},
	relation_type: {
		type: String,
		trim: true,
	},
	type_company: {
		type: String,
		trim: true,
	},
	size_company: {
		type: String,
		trim: true,
	},
	headquarters: {
		type: String,
		trim: true,
	},
	total_dollars_given: {
		type: Number,
	},
});

module.exports = mongoose.model('Companies', companiesSchema);
