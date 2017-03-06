import express from 'express';
import contactController from '../controllers/email.server.controller'

let router = express.Router();
let contact = contactController();

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/gallery', (req, res) => {
	res.render('./views/gallery/gallery');
});

router.get('/contact', (req, res) => {
	res.render('./views/contact/contact');
});

router.post('/contact', contact.contact);


module.exports = router;