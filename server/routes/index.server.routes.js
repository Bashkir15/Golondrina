import express from 'express';
var router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/portfolio', (req, res) => {
	res.render('./views/pages/portfolio/portfolio');
});

router.get('/portfolio/canvas', (req, res) => {
	res.render('./views/pages/portfolio/canvas');
});

router.get('/portfolio/residential', (req, res) => {
	res.render('./views/pages/portfolio/residential');
});

router.get('/portfolio/commercial', (req, res) => {
	res.render('./views/pages/portfolio/commercial');
});

router.get('/portfolio/digital', (req, res) => {
	res.render('./views/pages/portfolio/digital');
});

router.get('/about', (req, res) => {
	res.render('./views/pages/about');
});

router.get('/contact', (req, res) => {
	res.render('./views/pages/contact');
});

router.get('/media', (req, res) => {
	res.render('./views/pages/media');
});

module.exports = router;