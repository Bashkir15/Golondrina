module.exports = {
	server: {
		host: 'golondrina.herokuapp.com',
		port: process.env.PORT
	},

	mailer: {
		service: 'Gmail',
		auth: {
			user: process.env.USER,
			pass: process.env.PASS
		}
	},

	db: process.env.MONGODB_URI
};