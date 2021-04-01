const mongoose = require('mongoose');
let validator = require('validator');
require('mongoose-type-url');

const authSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	email: {
		type: String,
		required: true,
		maxlength: 80,
		trim: true,

		// need to have a validator which is from mongoose;
		// npm install mongoose validator
		validate: (value) => {
			return validator.isEmail(value);
		},
	},
	password: {
		type: String,
	},
});

module.exports = mongoose.model('Auth', authSchema);
