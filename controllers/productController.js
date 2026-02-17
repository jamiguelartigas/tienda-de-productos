const { Product } = require('../models/Product');
const getProductCards = require('../helpers/getProductCards');
const getProductCard = require('../helpers/getProductCard');
const getForm = require('../helpers/getForm');
const getFormEdit = require('../helpers/getFormEdit');
const getNavBar = require('../helpers/getNavBar');
const baseHtml = require('../helpers/baseHtml');
const uploadToCloudinary = require("../helpers/uploadToCloudinary");


const ProductController = {
    showProducts : async (req,res) => {
        try {
            const isDashboard = req.originalUrl.startsWith("/dashboard");
            const products = await Product.find();
            const productCards = getProductCards(products, { isDashboard });
            const content = getNavBar({ isDashboard }) + productCards;
            const html =  baseHtml(content);
            res.status(200).send(html)
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje : 'Error obteniendo los productos'})
        }
    },
    showProductById : async(req, res) => {
        try {
            const isDashboard = req.originalUrl.startsWith("/dashboard");
            const product = await Product.findById(req.params.productId);
            const productCard = getProductCard(product, { isDashboard });
            const content = getNavBar({ isDashboard }) + productCard;
            const html = baseHtml(content);
            
            if (!product) {
                return res.status(404).send('Producto no encontrado')
            };
            res.status(200).send(html)           
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje : 'Error obteniendo el producto'})
        }
    },
    showNewProduct : (req, res) => {
        const html = getForm();
        res.send(html)
    },
    createProduct : async (req, res) => {
        try {
            
            if (!req.file) {
                return res.status(400).send('Tienes que seleccionar una imagen')
            }
            const result = await uploadToCloudinary(req.file.buffer);
    
            const newProduct = new Product({
                ...req.body,
                imagen: result.secure_url
            });
            await newProduct.save();
    
            res.send(`
                <h2>Producto creado con éxito</h2>
                <a href="/dashboard">Volver al dashboard</a>
                `)
            
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje : 'Error creando el producto nuevo.'})
        }
    
    },
    showEditProduct: async (req, res) => {
        const product = await Product.findById(req.params.productId);
        const html = getFormEdit(product);

        res.send(html)
    },

    updateProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.productId)
            if (!product) {
                return res.status(404).send("Producto no encontrado")
            }
            
            if (req.body.nombre) product.nombre = req.body.nombre;
            if (req.body.descripcion) product.descripcion = req.body.descripcion;
            if (req.body.precio) product.precio = req.body.precio;
            if (req.body.categoria) product.categoria = req.body.categoria;
            if (req.body.talla) product.talla = req.body.talla;

            if (req.file) {
                const result = await uploadToCloudinary(req.file.buffer);
                product.imagen = result.secure_url
            }

            await product.save()
    
            res.send(`
                <h2>Producto actualizado con éxito</h2>
                <a href="/dashboard">Volver al dashboard</a>
                `)
            
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
        res.status(200).redirect('/dashboard')
        
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje : 'Error borrando el producto.'})
        }
    },

    showProductsByCategory : async (req, res) => {
        try {
            const isDashboard = req.originalUrl.startsWith("/dashboard");
            const products = await Product.find({ categoria : req.params.categoria });

            if (products.length === 0) {
                const content = getNavBar({ isDashboard }) + `<h2>No hay productos en esta categoría</h2>`
                return res.status(200).send(baseHtml(content))
            }
            const productCards = getProductCards(products, { isDashboard });
            const content = getNavBar({ isDashboard }) + productCards;
            const html = baseHtml(content);
            
            res.status(200).send(html) 

        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje : 'Error obteniendo el producto'})
        }
    }
};



module.exports = { ProductController };