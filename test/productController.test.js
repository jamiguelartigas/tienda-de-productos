const express = require('express');
const request = require('supertest');
const { Product } = require('../models/Product');
const ProductApiController = require('../controllers/productApiController');

jest.mock('../models/Product');
afterEach(() => jest.clearAllMocks());

describe('Testing API POST / creating a product', () => {
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
    });
    it('devuelve 400 si falta algún campo', async () => {
        await request(app)
        .post('/api/products')
        .send({ nombre: 'Camiseta', precio: 9.99 })
        .expect(400);
});
});

describe('Testing UPDATING a product', () =>{
    const app = express();
    app.use(express.json());
    app.put('/api/products/:productId', ProductApiController.updateProduct);

    it('Devuelve status 200 al actualizar un producto', async () => {
        const productId = "elquesea"
        const existingProduct = {
            _id: productId,
            nombre : "Dockers TEST",
            descripcion : "Zapatos deportivos TEST",
            imagen : "https://res.cloudinary.com/dv38gwo6l/image/upload/v1771179574/samples/ecommerce/shoes.png",
            categoria : "Zapatos",
            talla : "L",
            precio : 36,
            save: jest.fn()
        }
        const updateProduct = {
            nombre : "Dockers TEST UPDATE",
            descripcion : "Zapatos deportivos TEST UPDATE",
            imagen : "https://res.cloudinary.com/dv38gwo6l/image/upload/v1771179574/samples/ecommerce/shoes.png",
            categoria : "Zapatos",
            talla : "L",
            precio : 45
        }

        Product.findById.mockResolvedValue(existingProduct);
        
        existingProduct.save.mockResolvedValue(existingProduct);

        const res = await request(app)
            .put(`/api/products/${productId}`)
            .send(updateProduct);
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(updateProduct);
    });
});

describe('Testing DELETING a product', () => {
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