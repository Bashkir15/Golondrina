import mongoose from 'mongoose';


var imageSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now()
	},

	source: {
		type: String
	},

	category: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Category'
	},

	caption: {
		type: String
	}
});

mongoose.model('Image', imageSchema);