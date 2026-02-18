const { Product } = require('../models/Product');

const categories = Product.schema.path('categoria').enumValues;
const sizes = Product.schema.path('talla').enumValues;

const optionCategories = categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
const optionSizes = sizes.map(e => `<option value="${e}">${e}</option>`).join('');

function getForm() {
    const html= `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Nuevo producto</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <div class="form-container">
                <h1>Nuevo producto</h1>

                <form action="/dashboard" method="POST" enctype="multipart/form-data">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
                <label for="descripcion">Descripción:</label>
                <textarea name="description" id="description" rows="2" cols="25" required></textarea>
                <label for="precio">Precio (€):</label>
                <input type="number" id="precio" name="precio" min="0" step="0.01" required>
                <label for="imagen">Imagen:</label>
                <input type="file" id="imagen" name="imagen" accept="image/*">
                <label for="categoria">Categoría:</label>
                <select id="categoria" name="categoria" required>
                    <option value=""> - Selecciona - </option>
                    ${optionCategories}
                    </select>
                <label for="talla">Talla:</label>
                <select id="talla" name="talla" required>
                    <option value=""> — Selecciona — </option>
                    ${optionSizes}
                </select>

                <button type="submit">Guardar</button>
                </form>

                <p><a href="/dashboard">← Volver al dashboard</a></p>
            </div>
        </body>
        </html>
    `
    return html
};

module.exports = {
    getForm,
    optionCategories,
    optionSizes
};