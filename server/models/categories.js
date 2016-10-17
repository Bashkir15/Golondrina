import mongoose from 'mongoose';

var categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},

	images: [{
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'Image'
	}]
});

mongoose.model('Category', categorySchema);