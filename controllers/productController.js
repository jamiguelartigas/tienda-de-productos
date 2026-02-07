const { Product } = require('../models/Product');

const categories = Product.schema.path('Categoría').enumValues;
const sizes = Product.schema.path('Talla').enumValues;

const optionCategories = categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
const optionSizes = sizes.map(e => `<option value="${e}">${e}</option>`).join('');


exports.showNewProduct = (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Nuevo producto</title>
      </head>
      <body>
        <h1>Nuevo producto</h1>

        <form action="/dashboard" method="POST" enctype="multipart/form-data">
          <label for="name">Nombre:</label>
          <input type="text" id="name" name="name" required>
          <label for="description">Descripción:</label>
          <input type="text" id="description" name="description" required>
          <label for="price">Precio (€):</label>
          <input type="number" id="price" name="price" min="0" step="0.01" required>
          <label for="image">Imagen:</label>
          <input type="file" id="image" name="image" accept="image/*">
          <label for="category">Categoría:</label>
          <select id="category" name="category" required>
            <option value=""> - Selecciona - </option>
            ${optionCategories}
          <label for="size">Talla:</label>
          <select id="size" name="size" required>
            <option value=""> — Selecciona — </option>
            ${optionSizes}
          </select>

          <button type="submit">Guardar</button>
        </form>

        <p><a href="/dashboard">← Volver al dashboard</a></p>
      </body>
    </html>
  `;
  res.send(html);
};
