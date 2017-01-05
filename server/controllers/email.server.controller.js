import nodemailer from 'nodemailer'
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import json from '../helpers/json'
import ejs from 'ejs'

var Email = mongoose.model('Email')

module.exports = () => {
	let obj = {};

	obj.contact = (req, res) => {
		var emailTemplate = ejs.compile(fs.readFileSync('./server/templates/contact-email.ejs', {encoding: 'utf-8'}));
		var html = emailTemplate({name: req.body.name, email: req.body.email, phone: req.body.phone, message: req.body.message});
	
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
			html: html
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				json.bad(err, res);
			} else {
				json.good(info.response, res);
			}
		});
	}

	obj.subscribe = (req, res) => {
		var emailTemplate = fs.readFileSync('./server/templates/welcome-email.html', {encoding: 'utf-8'});

		var subsciber = new Email(req.body);
		subsciber.save((err) => {
			if (err) {
				return json.bad(err, res);
			}

			var transporter = nodemailer.createTransport({
				service: global.config.mailer.service,
				auth: {
					user: global.config.mailer.auth.user,
					pass: global.config.mailer.auth.pass
				}
			});

			var mailOptions = {
				from: 'Golondrina Studios',
				to: req.body.email,
				subject: 'Welcome to the Golondrina Newsletter',
				html: emailTemplate
			};

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return json.bad(error, res);
				} else {
					json.good(info.response, res);
				}
			});
		});
	};

	return obj;
};