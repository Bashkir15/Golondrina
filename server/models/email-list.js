import mongoose from 'mongoose';

var emailSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},

	email: {
		type: String,
		required: true,
		unique: true
	}
});

mongoose.model('Emails', emailSchema);