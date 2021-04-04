const mongoose = require('mongoose');

const passionSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	passion: {
		type: String,
		trim: true,
	},
});

module.exports = mongoose.model('Passions', passionSchema);
