function baseHtml (content) {
    const html = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Tienda de productos</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        ${content}        
      </body>
    </html>
    `
    return html
};
module.exports = baseHtml;
