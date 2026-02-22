function getProductCards(products, options = {}) {
    const { isDashboard } = options;
    let html = '';
    for (let product of products) {
        html += `
        <div class="product-card">
            <img src="${product.imagen}" alt="${product.nombre}">
            <h2>${product.nombre}</h2>
            <p>${product.descripcion}</p>
            <p>${product.precio}€</p>
            
            ${
                isDashboard 
                ? `<a href="/dashboard/${product._id}">Ver detalle</a>`
                : `<a href="/products/${product._id}">Ver detalle</a>`
            }
        </div>
        `;
    }
    return html;
}

module.exports = getProductCards;