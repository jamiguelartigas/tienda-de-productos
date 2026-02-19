function baseHtml (content, req) {
    return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Tienda de productos</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        ${content}
        ${req.session?.userId ? `
          <div class="crear-producto">
          <form action="/dashboard/new">
          <button type="submit">Nuevo producto</button>
          </form>
          <form class="logout-button" action="/logout" method="POST">
          <button>Logout</button>
          </form>
          </div>
          `
          : ""
        }        
      </body>
    </html>
    `
};

function indexHtml() {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Nuevo producto</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div class="index-html">
          <div class="titulos-index">
            <h1>Tienda de productos</h1><br>
            <h2>Haz <a href="/products">click</a> para entrar a la página</h2>
            <h4><a href="/login">Login</a> como administrador</h4>
          </div>
        </div>
     </body>
    </html>
`
};


module.exports = { baseHtml, indexHtml };
