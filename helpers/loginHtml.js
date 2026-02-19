const loginHtml = `
    <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Nuevo producto</title>
            <link rel="stylesheet" href="/styles.css"></link>
         </head>
        <body>
            <div class="login-form">
            <h2>Login</h2>
            <form action="/login" method="POST">
                <label for="user">Usuario:</label>
                <input type="text" name="user" id="user">
                <label for="password" >Contraseña:</label>
                <input type="password" name="password" id="password">
                <button type="submit">Entrar</button>
            </form>
            </div>
        </body>
    </html>
    `

module.exports = loginHtml;