function getNavBar(options = {}) {
    const { isDashboard = false } = options;
    const html = `
            ${
                isDashboard 
                ? `<nav>
                <a href="/dashboard">Productos</a>
                <a href="/dashboard/category/Camisetas">Camisetas</a>
                <a href="/dashboard/category/Pantalones">Pantalones</a>
                <a href="/dashboard/category/Zapatos">Zapatos</a>
                <a href="/dashboard/category/Accesorios">Accesorios</a>
                <a href="/login">Login</a>
                </nav>
                
                `
                : `<nav>
                    <a href="/products">Productos</a>
                    <a href="/products/category/Camisetas">Camisetas</a>
                    <a href="/products/category/Pantalones">Pantalones</a>
                    <a href="/products/category/Zapatos">Zapatos</a>
                    <a href="/products/category/Accesorios">Accesorios</a>
                    <a href="/login">Login</a>
                </nav>`
            }           
    `
    return html;
};

module.exports = getNavBar;