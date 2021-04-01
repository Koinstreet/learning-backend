const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	name: {
		type: String,
		trim: true,
	},
	testimonial: {
		type: String,
		trim: true,
	},
	profile_pic: {
		type: String,
	},
	display_on_web: {
		type: Boolean,
	},
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
