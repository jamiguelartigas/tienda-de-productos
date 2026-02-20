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
                    <link rel="icon" type="image/png" href="/images/favicon.ico">
                </head>
                <body>
                    <h2 class="warning-msg">Ya estás logad@<br> <a href="/dashboard">Atrás</a></h2>
                        
                </body>
                </html>
        `);
    }
    res.send(loginHtml);
});

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

module.exports = router;
