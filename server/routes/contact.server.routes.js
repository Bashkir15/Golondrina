import express from 'express'
import contactController from '../controllers/email.server.controller'

let router = express.Router();
let contact = contactController();

router.get('/', (req, res) => {
	res.render('./views/contact/contact');
});

router.post('/', contact.contact);
router.post('/newsletter', contact.subscribe);

module.exports = router;