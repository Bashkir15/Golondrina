import express from 'express'
import userController from '../controllers/users.server.controller'

let router = express.Router();
let users = userController();

router.post('/', users.create);
router.post('/authenticate', users.authenticate);

module.exports = router