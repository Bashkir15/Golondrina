module.exports = {
	server: {
		host: 'golondrina.herokuapp.com',
		port: process.env.PORT
	},

	mailer: {
		service: 'Gmail',
		auth: {
			user: 'golondrinaStudios@gmail.com',
			pass: process.env.PASS
		}
	},

	//db: process.env.MONGODB_URI */
};