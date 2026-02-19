const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const loginHtml = require('../helpers/loginHtml');

router.get('/login', (req, res) => {
    res.send(loginHtml)
});

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

module.exports = router;
