const express = require('express');
const router = express.Router();

const upload = require("../middlewares/upload");
const { ProductController } = require('../controllers/productController');

router.get('/', (req, res) => {
    res.json({ mensaje : 'Funciona! Página de inicio'})
});

// GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.

router.get('/products', ProductController.showProducts);

// GET /products/category/:categoria Devuelve los productos clasificados por categoría

router.get('/products/category/:categoria', ProductController.showProductsByCategory);

// GET /products/:productId: Devuelve el detalle de un producto.

router.get('/products/:productId', ProductController.showProductById);

// GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.

router.get('/dashboard', ProductController.showProducts);

// GET /dashboard/category/:categoria Devuelve los productos clasificados por categoría desde el dashboard

router.get('/dashboard/category/:categoria', ProductController.showProductsByCategory);

// GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.

router.get('/dashboard/new', ProductController.showNewProduct);

// POST /dashboard: Crea un nuevo producto.

router.post('/dashboard', upload.single('imagen'), ProductController.createProduct);

// GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.

router.get('/dashboard/:productId', ProductController.showProductById);

// GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.

router.get('/dashboard/:productId/edit', ProductController.showEditProduct);

// PUT /dashboard/:productId: Actualiza un producto.

router.put('/dashboard/:productId', upload.single('imagen'), ProductController.updateProduct);

// DELETE /dashboard/:productId/delete: Elimina un producto.

router.delete('/dashboard/:productId/delete', ProductController.deleteProduct);


module.exports = router;