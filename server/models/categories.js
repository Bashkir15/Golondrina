import mongoose from 'mongoose';

var categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
});

mongoose.model('Category', categorySchema);