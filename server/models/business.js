import mongoose from 'mongoose'

const businessSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},

	location: {
		type: String,
		required: true
	},

	latestWork: {
		type: Date()
	},

	images: [{
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'Images'
	}]
});

mongoose.model('Business', businessSchema);