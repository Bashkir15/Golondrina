import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import async from 'async';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import json from '../helpers/json';
import { generateToken } from '../helpers/auth'

var User = mongoose.model('User');

module.exports = () => {
	var obj = {};

	obj.create = (req, res) => {
		let roles = ['authenticated'];

		User.count({}, (err, len) => {
			if (!len) {
				roles.push('admin');
			}

			console.log(req.body);
			let user = new User(req.body);
			user.provider = 'local';
			user.roles = roles;

			let token = generateToken(user);

			user.save((err) => {
				if (err) {
					return json.bad(err, res);
				}

				json.good({
					record: user,
					token: token
				}, res);
			});
		});
	};

	obj.beforeAuthentication = (req, res) => {
		async.waterfall([
			(done) => {
				crypto.randomBytes(20, (err, buf) => {
					var token = buf.toString('hex');
					done(err, token);
				});
			},

			(token, done) => {
				User.findOne({email: 'Forest.D.Collins@gmail.com'}, (err, user) => {
					if (err) {
						return json.bad(err, res);
					}

					user.activationCode = token;
					user.activationCodeExpires = Date.now() * 360000;

					user.save((err) => {
						done(err, token, user);
					});
				});
			},

			(token, user, done) => {
				var mailTransport = nodemailer.createTransport({
					service: global.config.mailer.service,
					auth: {
						user: global.config.mailer.auth.user,
						pass: global.config.mailer.auth.pass
					}
				});

				var mailOptions = {
					to: user.email,
					from: 'Golondrina Stuidios',
					subject: 'Your Activation Code',
					text: user.resetPasswordToken
				};

				mailTransport.sendMail(mailOptions, (err, info) => {
					done(err, 'done');
				});
			}
		], (err) => {
			var success = true;

			if (err) {
				return json.bad(err, res);
			}

			json.good({
				record: success
			}, res);
		});
	};

	obj.processBeforeAuthentication = (req, res) => {
		User.findOne({
			activationCode: req.body.token,
			activationCodeExpires: {
				$gt: Date.now()
			}
		}, (err, user) => {
			if (err) {
				return json.bad(err,res);
			}

			if (!user) {
				return json.bad({message: 'That activation code is either invalid or has expired. Please try again'}, res);
			}

			user.activationCode = undefined;
			user.activationCodeExpires = undefined;

			user.save((err) => {
				var success = true;

				if (err) {
					return json.bad(err, res);
				}

				json.good({
					record: success
				}, res);
			});
		});
	};


	obj.authenticate = (req, res) => {
		User.findOne({email: req.body.email}, (err, user) => {
			if (err) {
				return json.bad(err, res);
			}

			if (user.isLocked) {
				return user.incorrectLoginAttempts((err) => {
					if (err) {
						return json.bad(err, res);
					}

					json.bad({message: 'Sorry, you have reached the maximum number of login attempts and your account is locked until ' + user.lockUntil}, res);
				});
			}

			if (user.secureLock) {
				return json.bad({message: 'Sorry, you have reached the maximum number of login attempts 4 times now. Your account has been locked until further notice. Please contact us to resolve this issue'}, res);
			}

			user.comparePassword(req.body.password, (err, isMatch) => {
				if (err) {
					return json.bad(err, res);
				}

				if (isMatch) {
					let token = generateToken(user);

					if (!user.loginAttempts && !user.lockUntil && !user.secureLock) {
						return json.good({
							record: user,
							token: token
						}, res);
					}

					var updates = {
						$set: {
							loginAttempts: 0,
							limitReached: 0
						},

						$unset: {
							lockUntil: 1
						}
					};

					return user.update(updates, (err, item) => {
						if (err) {
							return json.bad(err, res);
						}

						json.good({
							record: user,
							token: token
						}, res);
					});
				}

				user.incorrectLoginAttempts((err) => {
					var totalAttempts;

					if (err) {
						return json.bad(err, res);
					}

					if (user.limitReached >= 2) {
						totalAttempts = 3;
					} else {
						totalAttempts = 5;
					}

					json.bad({message: 'Sorry, either your email or password were incorrect. You have ' + (totalAttempts - user.loginAttempts) + 'remaining until your account is locked.' }, res);
				});
			});
		});
	};

	return obj;
};
