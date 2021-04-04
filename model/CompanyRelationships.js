const mongoose = require('mongoose');

const companyRelationshipsSchema = new mongoose.Schema({
	company_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company',
		required: true,
	},
	relation: {
		type: String,
		trim: true,
	},
});

module.exports = mongoose.model(
	'CompanyRelationships',
	companyRelationshipsSchema,
);
