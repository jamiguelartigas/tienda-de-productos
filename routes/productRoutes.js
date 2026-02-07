const express = require('express');
const router = express.Router();
const  Product  = require('../models/Product');

router.get('/', (req, res) => {
    res.json({ mensaje : 'Funciona! Página de inicio'})
});

// GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get('/products', async (req,res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje : 'Error obteniendo los productos'})
    }
});


// GET /products/:productId: Devuelve el detalle de un producto.

router.get('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        res.status(200).json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje : 'Error obteniendo el producto por ID'})
    }
});

// GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.

router.get('/dashboard', async (req,res) => {
    try {
        const products = Product.find();
        res.status(200).json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje : 'Error obteniendo los productos'})
    }
});

// GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
// POST /dashboard: Crea un nuevo producto.

router.post('/dashboard', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body)
        res.status(201).json(newProduct)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje : 'Error creando el producto nuevo.'})
    }

});
// GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
// GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
// PUT /dashboard/:productId: Actualiza un producto.
// DELETE /dashboard/:productId/delete: Elimina un producto.

router.delete('/dashboard/:productId/delete', async (req,res) => {
    try {
        const productId = req.params.productId;
        if (!productId) {
            return res.status(404).json({ mensaje : 'Producto no encontrado'})
        }

        await Product.findByIdAndDelete(productId)
        res.status(200).json({
            mensaje : 'Producto eliminado correctamente',
            productId
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje : 'Error borrando el producto.'})
    }
});


module.exports = router;