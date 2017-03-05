import express from 'express';
import emailHelper from '../helpers/email';

var email = emailHelper();
var router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});

router.post('/', email.subscribe);

router.get('/gallery', (req, res) => {
	res.render('./views/gallery/gallery');
});

router.get('/murals', (req, res) => {
	res.render('./views/others/murals');
});

module.exports = router;