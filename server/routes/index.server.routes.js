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

router.get('/gallery/windows', (req, res) => {
	res.render('./views/gallery/windows');
});

router.get('/recent', (req, res) => {
	res.render('./views/pages/recent');
});

router.get('/media', (req, res) => {
	res.render('./views/pages/media');
});

router.get('/signup', (req, res) => {
	res.render('./views/admin/signup');
});

router.get('/login', (req, res) => {
	res.render('./views/admin/login');
});

module.exports = router;