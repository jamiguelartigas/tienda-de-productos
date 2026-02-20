const { Product } = require('../models/Product');
const getProductCards = require('../helpers/getProductCards');
const getProductCard = require('../helpers/getProductCard');
const { getForm } = require('../helpers/getForm');
const getFormEdit = require('../helpers/getFormEdit');
const getNavBar = require('../helpers/getNavBar');
const { baseHtml } = require('../helpers/baseHtml');
const uploadToCloudinary = require("../middlewares/uploadToCloudinary");


const ProductController = {
    showProducts : async (req,res) => {
        try {
            const isDashboard = req.path.startsWith("/dashboard");
            const products = await Product.find();
            const productCards = getProductCards(products, { isDashboard });
            const content = getNavBar({ isDashboard }) + productCards;
            const html =  baseHtml(content, req);
            res.status(200).send(html)
        } catch (error) {
            console.error(error)
            res.status(500).send('Error obteniendo los productos')
        }
    },
    showProductById : async(req, res) => {
        try {
            const isDashboard = req.path.startsWith("/dashboard");
            const product = await Product.findById(req.params.productId);
            const productCard = getProductCard(product, { isDashboard });
            const content = getNavBar({ isDashboard }) + productCard;
            const html = baseHtml(content,req);
            
            if (!product) {
                return res.status(404).send('Producto no encontrado')
            };
            res.status(200).send(html)           
        } catch (error) {
            console.error(error)
            res.status(500).send('Error obteniendo el producto')
        }
    },
    showProductsByCategory : async (req, res) => {
        try {
            const isDashboard = req.path.startsWith("/dashboard");
            const products = await Product.find({ categoria : req.params.categoria });

            if (products.length === 0) {
                const content = getNavBar({ isDashboard }) + `<h2 class="warning-msg">No hay productos en esta categoría: ${req.params.categoria}</h2>`
                return res.status(200).send(baseHtml(content, req))
            }
            const productCards = getProductCards(products, { isDashboard });
            const content = getNavBar({ isDashboard }) + productCards;
            const html = baseHtml(content,req);
            
            res.status(200).send(html) 

        } catch (error) {
            console.error(error)
            res.status(500).send('Error obteniendo el producto')
        }
    },
    showNewProduct : (req, res) => {
        const html = getForm();
        res.send(html)
    },
    createProduct : async (req, res) => {
        try {
            
            if (!req.file) {
                return res.status(400).send(`
                    <!DOCTYPE html>
                        <html lang="es">
                        <head>
                            <meta charset="UTF-8">
                            <title>Tienda de productos</title>
                            <link rel="stylesheet" href="/styles.css">
                            <link rel="icon" type="image/png" href="/images/favicon.ico">
                        </head>
                        <body>
                            <div class="warning-msg">
                                <h2>Tienes que seleccionar una imagen</h2>
                                <button type="button" onclick="history.back()">Atrás</button>
                            </div>
                        </body>
                        </html>
                `)
            }
            const result = await uploadToCloudinary(req.file.buffer);
    
            await Product.create({
                ...req.body,
                imagen: result.secure_url
            });
    
            res.status(201).send(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <title>Tienda de productos</title>
                    <link rel="stylesheet" href="/styles.css">
                    <link rel="icon" type="image/png" href="/images/favicon.ico">
                </head>
                <body>
                    <div class="warning-msg">
                        <h2>Producto creado con éxito</h2>
                        <a href="/dashboard">Volver al dashboard</a>
                    </div>
                </body>
                </html>
                `)
            
        } catch (error) {
            console.error(error)
            res.status(500).send('Error creando el producto nuevo.')
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
            if (req.body.precio !== undefined) product.precio = Number(req.body.precio);
            if (req.body.categoria) product.categoria = req.body.categoria;
            if (req.body.talla) product.talla = req.body.talla;

            if (req.file) {
                const result = await uploadToCloudinary(req.file.buffer);
                product.imagen = result.secure_url
            }

            await product.save()
    
            res.send(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <title>Tienda de productos</title>
                    <link rel="stylesheet" href="/styles.css">
                    <link rel="icon" type="image/png" href="/images/favicon.ico">
                </head>
                <body>
                    <div class="warning-msg">
                        <h2>Producto actualizado con éxito</h2>
                        <a href="/dashboard">Volver al dashboard</a>
                    </div>
                </body>
                </html>
                `)
            
        } catch (error) {
            console.error(error)
            res.status(500).send('Error actualizando el producto nuevo.')
        }
    },
    deleteProduct : async (req,res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId)
        if (!deletedProduct) {
            return res.status(404).send('Producto no encontrado')
        }

        res.status(200).redirect('/dashboard')
        
        } catch (error) {
            console.error(error)
            res.status(500).send('Error borrando el producto.')
        }
    }
};

module.exports = { ProductController };