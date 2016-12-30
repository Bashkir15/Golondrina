import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import json from './json'

function generateToken(obj) {
	let today = new Date();
	let exp = new Date(today);
	exp.setDate(today.getDate() + 2);

	return jwt.sign({
		user: obj,
		exp: parseInt(exp.getTime() / 1000)
	}, global.config.secret);
}

function ensureAdmin(req, res, next) {
	let User = mongoose.model('User');
	let bearerToken;
	let bearerHeader = req.headers['authorization'];

	if (typeof bearerHeader !== 'undefined') {
		let bearer = bearerHeader.split(" ");
		bearerToken = bearer[1];

		try {
			let decoded = jwt.verify(bearerToken, global.config.secret);
			let requestedUser = decoded.user._id;

			User.findOne({_id: requestedUser}, (err, user) => {
				if (err || !user) {
					return res.sendStatus(403);
				}

				if (user) {
					if (user.roles.indexOf('admin') !== -1) {
						req.user = user;
						next();
					} else {
						res.sendStatus(403);
					}
				}
			});
		} catch(err) {
			res.sendStatus(403);
		}
	} else {
		res.sendStatus(403);
	}

}

module.exports = {
	generateToken: generateToken
}