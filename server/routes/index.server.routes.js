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

module.exports = router;