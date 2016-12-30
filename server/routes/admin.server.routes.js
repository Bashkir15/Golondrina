import express from 'express'

let router = express.Router();

router.get('/', (req, res) => {
	res.render('./views/admin/admin');
});

module.exports = router;