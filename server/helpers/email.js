import nodemailer from 'nodemailer';


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
				res.send(info.response);
				console.log('Message sent' + info.response);
			}
		});
	};

	return obj;
}