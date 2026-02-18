const { Product } = require('../models/Product');

const ProductApiController = {
    showProducts : async (req,res) => {
        try {   
            const products = await Product.find();
            res.status(200).json(products)
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje : 'Error obteniendo los productos'})
        }
    },
    showProductById : async(req, res) => {
            try {
                const product = await Product.findById(req.params.productId);
                if (!product) {
                    return res.status(404).json({ mensaje: "Producto no encontrado" })
                };

                res.status(200).json(product)           
            } catch (error) {
                console.error(error)
                res.status(500).json({ mensaje : 'Error obteniendo el producto'})
            }
    },
    createProduct : async (req, res) => {
            try {
                const newProduct = new Product({
                ...req.body,
                });
                await newProduct.save();
        
                res.status(201).json({ mensaje : 'Producto creado con éxito!' })
                
            } catch (error) {
                console.error(error)
                res.status(500).json({ mensaje : 'Error creando el producto nuevo.'})
            }
        
    },
    updateProduct: async (req, res) => {
            try {
                const product = await Product.findById(req.params.productId)
                if (!product) {
                    return res.status(404).json({ mensaje: "Producto no encontrado" })
                }
                
                if (req.body.nombre) product.nombre = req.body.nombre;
                if (req.body.descripcion) product.descripcion = req.body.descripcion;
                if (req.body.imagen) product.imagen = req.body.imagen;
                if (req.body.categoria) product.categoria = req.body.categoria;
                if (req.body.talla) product.talla = req.body.talla;
                if (req.body.precio) product.precio = req.body.precio;
                
                await product.save()
        
                res.json({ mensaje : 'Producto actualizado con éxito!'})
                
            } catch (error) {
                console.error(error)
                res.status(500).json({ mensaje : 'Error actualizando el producto nuevo.'})
            }
    },
    deleteProduct : async (req,res) => {
    try {
        const productId = req.params.productId;
        if (!productId) {
            return res.status(404).json({ mensaje : 'Producto no encontrado'})
        }

        await Product.findByIdAndDelete(productId)
        res.status(200).json({ mensaje: 'Producto eliminado con éxito!'})
        
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje : 'Error borrando el producto.'})
        }
    }
};

module.exports = ProductApiController;