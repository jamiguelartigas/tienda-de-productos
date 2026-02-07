const mongoose = require('mongoose');
const validCategories = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL'];

const productSchema = new mongoose.Schema(
    {
        nombre : {
            type: String,
            required : true
        },
        descripcion : {
            type : String, 
            required : true
        },
        imagen : {
            type: String,
            required : true
        },
        categoria : {
            type : String,
            enum: validCategories,
            required : true
        },
        talla : {
            type: String,
            enum: validSizes,
            required : true
        },
        precio : {
            type : Number,
            required : true,
            min: 0 
        }
    },
    {
        timestamps : true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
