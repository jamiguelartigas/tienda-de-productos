function getProductCard(product, options = {}) {
    const { isDashboard } = options;
  let html = `
      <div class="product-card">
        <img src="${product.imagen}" alt="${product.nombre}">
        <h2>${product.nombre}</h2>
        <p>Descripción: ${product.descripcion}</p>
        <p>Precio: ${product.precio}€</p>
        <p>Categoría: ${product.categoria}</p>
        <p>Talla: ${product.talla}</p>
        ${
            isDashboard 
                ? `<a href="/dashboard/${product._id}/edit">Editar</a>
                   <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST"> 
                    <button type="submit">Eliminar</button>
                   </form>
                   <a href="/dashboard">Volver al dashboard</a>
                   `
                : `<a href="/products">Volver a productos</a>`
        }
        
      </div>
    `;
    return html;
}


module.exports = getProductCard;