const { Product } = require('../models/Product');

const categories = Product.schema.path('categoria').enumValues;
const sizes = Product.schema.path('talla').enumValues;

function getFormEdit(product) {
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
                <h1>Editar producto</h1>

                <form action="/dashboard/${product._id}/?_method=PUT" method="POST" enctype="multipart/form-data">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value="${product.nombre}" required>
                <label for="descripcion">Descripción:</label>
                <textarea name="descripcion" id="descripcion" rows="2" cols="25" required>${product.descripcion}</textarea>
                <label for="precio">Precio (€):</label>
                <input type="number" id="precio" name="precio" min="0" step="0.01" value="${product.precio}" required>
                <label for="imagen">Imagen:</label>
                <img src="${product.imagen}" alt="${product.nombre}">
                <input type="file" id="imagen" name="imagen" accept="image/*">
                <label for="categoria">Categoría:</label>
                <select id="categoria" name="categoria" required>
                    <option value=""> - Selecciona - </option>
                    ${
                        categories.map(cat =>
                            `<option value="${cat}" ${product.categoria === cat ? "selected" : ""} >${cat}</option>`
                        ).join('')
                    }
                </select>
                <label for="talla">Talla:</label>
                <select id="talla" name="talla" required>
                    <option value=""> — Selecciona — </option>
                    ${
                        sizes.map(size =>
                            `<option value="${size}" ${product.talla === size ? "selected" : ""}>${size}</option>`
                        ).join('')
                    }
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

module.exports = getFormEdit;