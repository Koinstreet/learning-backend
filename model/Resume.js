const mongoose = require('mongoose');
require('mongoose-type-url');

const resumeSchema = new mongoose.Schema({
	// using the npm i mongoose-type-url from npm and is imported at top of file
	resume_link: {
		type: mongoose.SchemaTypes.Url,
	},
});

module.exports = mongoose.model('Resume', resumeSchema);
