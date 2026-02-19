const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const loginHtml = require('../helpers/loginHtml');
const baseHtml = require('../helpers/baseHtml');

router.get('/login', (req, res) => {
    if (req.session?.userId) {
        return res.send(`
            <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <title>Tienda de productos</title>
                    <link rel="stylesheet" href="/styles.css">
                </head>
                <body>
                    <h2 class="warning-msg">Ya estás logado.<br> <a href="/dashboard">Atrás</a></h2>
                        
                </body>
                </html>
        `);
    }
    res.send(loginHtml);
});

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

module.exports = router;
