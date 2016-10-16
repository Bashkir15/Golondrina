import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import json from './json'

var Newsletter = mongoose.model('Emails');

module.exports = () => {
	var obj = {};

	obj.message = function (req, res) {
		var transporter = nodemailer.createTransport({
			service: global.config.mailer.service,
			auth: {
				user: global.config.mailer.auth.user,
				pass: global.config.mailer.auth.pass
			}
		});

		var mailOptions = {
			from: req.body.email,
			to: global.config.mailer.auth.user,
			subject: 'New contact from ' + req.body.name,
			text: req.body.message
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(err);
			} else {
				json.good(info.response, res);
				console.log('Message sent' + info.response);
			}
		});
	};

	obj.subscribe = (req, res) => {
		var subscriber = new Newsletter(req.body);
		subscriber.email = req.body.email;
		subscriber.save((err) => {
			if (err) {
				return json.bad(err, res);
			}

			json.good(subscriber, res);
		});
	};



	return obj;
}