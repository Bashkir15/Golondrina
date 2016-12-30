import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

var userSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},

	name: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	},

	roles: {
		type: Array
	},

	loginAttempts: {
		type: Number,
		required: true,
		default: 0
	},

	lockUntil: {
		type: Number
	},

	limitReached: {
		type: Number,
		required: true,
		default: 0
	},

	secureLock: {
		type: Boolean,
		default: false
	},

	token: {
		type: String
	},

	activationCode: String,
	activationCodeExpires: Date,
	resetPasswordToken: String,
	resetPasswordExpires: Date
});

userSchema.pre('save', function(next) {
	var user = this;

	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});

userSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

userSchema.virtual('isLocked').get(function() {
	return !!(this.lockUntil && this.lockUntil > Date.now());
});

userSchema.methods = {

	isAdmin: function() {
		return this.roles.indexOf('admin') !== -1;
	},

	comparePassword: function(candidatePassword, cb) {
		var user = this;
		bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
			if (err) {
				return cb(err);
			}

			cb(null, isMatch);
		});
	},

	incorrectLoginAttempts: function(cb) {
		if (this.lockUntil && this.lockUntil < Date.now()) {
			return this.update({
				$set: {
					loginAttempts: 1,
					limitReached: 0
				},

				$unset: {
					lockUntil: 1
				}
			}, cb);
		}

		var updates = {
			$inc: { loginAttempts: 1 }
		};

		if (this.loginAttempts + 1 > 5 && !this.isLocked) {
			updates.$set = {
				lockUntil: Date.now() + 2 * 60 * 60 * 1000,
				limitReached: 1
			};
		}

		if (this.loginAttempts + 1 > 5 && this.limitReached == 1 && !this.isLocked) {
			updates.$set = {
				lockUntil: Date.now() + 4 * 60 * 60 * 1000,
				limitReached: 2
			};
		}

		if (this.loginAttempts + 1 > 3 && this.limitReached == 2 && !this.isLocked) {
			updates.$set = {
				lockUntil: Date.now() + 8 * 60 * 60 * 1000,
				limitReached: 3
			};
		}

		if (this.loginAttempts + 1 > 3 && this.limitReached == 3 && !this.isLocked) {
			updates.$set = {
				lockUntil: Date.now() + 10000 * 60 * 60 * 1000,
				limitReached: 4,
				secureLock: true
			};
		}

		return this.update(updates, callback);
	},

	toJSON: function() {
		var obj = this.toObject();
		delete obj.password;

		return obj;
	}
};


mongoose.model("User", userSchema);