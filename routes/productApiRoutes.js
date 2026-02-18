const express = require('express');
const router = express.Router();
const ProductApiController = require('../controllers/productApiController');

// GET Mostrar todos los productos
router.get('/products', ProductApiController.showProducts);

//GET Mostrar productos por ID
router.get('/products/:productId', ProductApiController.showProductById);

// POST Crear un nuevo producto 
router.post('/products/create', ProductApiController.createProduct);

// PUT Actualizar un producto 
router.put('/products/:productId', ProductApiController.updateProduct);

// DELETE Borrar un producto
router.delete('/products/:productId', ProductApiController.deleteProduct);

module.exports = router;