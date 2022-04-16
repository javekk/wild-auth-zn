const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const index = require(appRoot + '/src/main/door/inbound/route/controller/index.js');
const userController = require(appRoot + '/src/main/door/inbound/route/controller/userController.js');


router.get('/ping', index.ping);

router.post('/login', userController.login);

router.get('/user', userController.getAll);
router.get('/user/:id', userController.getById);
router.post('/user', userController.createUser);


module.exports = router;