const mongoose = require('mongoose');
let validator = require('validator');
require('mongoose-type-url');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 50,
			minlength: 2,
			trim: true,
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

		birthday: {
			type: Date,
			trim: true,
		},

		age: {
			type: Number,
		},

		phone_number: {
			type: Number,
		},

		gradyr: {
			type: Number,
		},

		experience: {
			type: String,
			trim: true,
		},

		picture: {
			data: Buffer,
			contentType: String,
		},

		iq: {
			type: Number,
		},

		eq: {
			type: Number,
		},

		ethnicity: {
			type: String,
			trim: true,
		},

		natural_languages: {
			type: [String],
		},

		hometown: {
			type: String,
			trim: true,
		},

		current_location: {
			type: String,
			trim: true,
		},

		is_deleted: {
			type: Number,
		},

		// auth_login
		facebook_auth: {
			id: String,
			token: String,
			email: String,
			name: String,
		},
		google_auth: {
			id: String,
			token: String,
			email: String,
			name: String,
		},
		github_auth: {
			id: String,
			token: String,
			email: String,
			name: String,
		},
		Twitter_auth: {
			id: String,
			token: String,
			email: String,
			name: String,
		},
		Linkedin_auth: {
			id: String,
			token: String,
			email: String,
			name: String,
		},

		passions: {
			type: [String],
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('User', userSchema);
