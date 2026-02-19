const AuthController = {
    login: (req, res) => {
        const { user, password } = req.body;

        if (user === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
            req.session.userId = user;
            return res.redirect('/dashboard');
        }

        return res.status(401).send('Credenciales incorrectas');
    },
    logout: (req, res) => {
        req.session.destroy(() => {
        res.clearCookie('connect.sid');
        return res.redirect('/');
        });
    } 
}

module.exports = AuthController;