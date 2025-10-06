const express = require('express');
const UserController = require('./user.controller');
const authMiddleware = require('../../common/middlewares/auth.middleware');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', authMiddleware, UserController.profile);

module.exports = router;
