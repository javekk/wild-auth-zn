const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const index = require(appRoot + '/src/main/door/inbound/route/controller/index.js');
const userController = require(appRoot + '/src/main/door/inbound/route/controller/userController.js');
const validationController = require(appRoot + '/src/main/door/inbound/route/controller/validationController.js');


router.get('/ping', index.ping);

router.post('/login', userController.login);

router.get('/user', validationController.allowIfLoggedin, userController.getAll);
router.get('/user/:id',validationController.allowIfLoggedin, userController.getById);
router.post('/user',validationController.allowIfLoggedin, userController.createUser);


module.exports = router;