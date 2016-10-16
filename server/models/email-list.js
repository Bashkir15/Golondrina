import mongoose from 'mongoose';

var emailSchema = new mongoose.Schema({
	emails: {
		type: 'Array',
		default: []
	}
});

mongoose.model('Emails', emailSchema);