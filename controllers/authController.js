const AuthController = {
    login: (req, res) => {
        const { user, password } = req.body;

        if (user === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
            req.session.userId = user;
            return res.redirect('/dashboard');
        }

        return res.status(401).send(`
            <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <title>Tienda de productos</title>
                    <link rel="stylesheet" href="/styles.css">
                </head>
                <body>
                    <div class="warning-msg">
                    <h2>Credenciales incorrectas. </h2>
                    <h3><a href="/">Inicio</a><br><br>
                    <a href="/login">Login</a></h3>
                    </div>
                        
                </body>
                </html>
            `);
    },
    logout: (req, res) => {
        req.session.destroy(() => {
        res.clearCookie('connect.sid');
        return res.redirect('/');
        });
    } 
}

module.exports = AuthController;