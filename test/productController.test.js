const express = require('express');
const request = require('supertest');
const { Product } = require('../models/Product');
const ProductApiController = require('../controllers/productApiController');

jest.mock('../models/Product');
afterEach(() => jest.clearAllMocks());

describe('Testing API POST / create product', () => {
    const app = express();
    app.use(express.json());
    app.post('/api/products', ProductApiController.createProduct);

    it('Responde 201 con el producto creado', async () => {
        const body = {
            nombre : "Dockers TEST",
            descripcion : "Zapatos deportivos TEST",
            imagen : "https://res.cloudinary.com/dv38gwo6l/image/upload/v1771179574/samples/ecommerce/shoes.png",
            categoria : "Zapatos",
            talla : "L",
            precio : 36
        };
        const fakeDoc = {
            _id : "324987234",
            ...body
        };

        Product.create.mockResolvedValue(fakeDoc);

        const res = await request(app).post('/api/products').send(body);

        expect(res.status).toBe(201);
        expect(res.body).toEqual({
            _id: "324987234",
            nombre : "Dockers TEST",
            descripcion : "Zapatos deportivos TEST",
            imagen : "https://res.cloudinary.com/dv38gwo6l/image/upload/v1771179574/samples/ecommerce/shoes.png",
            categoria : "Zapatos",
            talla : "L",
            precio : 36
            
        })
    })
});

describe('Testing DELETE product', () => {
    const app = express();
    app.use(express.json());
    app.delete('/api/products/:productId', ProductApiController.deleteProduct);
    
    it('Responde 200 con el producto eliminado', async () => {
        const productId = "69871434816375b4ec3bc689";
        Product.findByIdAndDelete.mockResolvedValue({
            _id : productId,
            nombre : 'Producto borrado'
        });
        
        const res = await request(app).delete(`/api/products/${productId}`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ mensaje: 'Producto eliminado con éxito!'})
    });
    it('Responde 404 si no existe el producto', async () => {
        const productId = "Me invento el número"
        Product.findByIdAndDelete.mockResolvedValue(null);

        const res = await request(app).delete(`/api/products/${productId}`);

        expect(res.status).toBe(404);
        expect(res.body).toEqual({ mensaje: 'Producto no encontrado'})
        
    })
});