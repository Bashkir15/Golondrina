import express from 'express'
import contactController from '../controllers/email.server.controller'

let router = express.Router();
let contact = contactController();

router.get('/', (req, res) => {
	res.render('./views/contact/contact');
});

router.post('/', contact.contact);

module.exports = router;