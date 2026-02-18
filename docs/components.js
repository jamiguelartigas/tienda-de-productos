module.exports = {
    components:{
        schemas:{
            Product:{
                type:'object',
                properties:{
                    nombre:{
                        type:'string',
                        description:"name to register",
                        example:"Camiseta"
                        },
                    descripcion:{
                        type:'string',
                        description:"product description",
                        example:"Camiseta color azul"
                        },
                    imagen: {
                        type:'string',
                        description:"product image",
                        example:"https://res.cloudinary.com/dv38gwo6l/image/upload/v1771179574/samples/ecommerce/shoes.png"
                    },
                    categoria:{
                        type:'string',
                        description:"product category",
                        example:"Camisetas"
                    },
                    talla:{
                        type:'string',
                        description:"product size",
                        example:"M"
                    },
                    precio: {
                        type:'number',
                        description:"product price",
                        example: 30
                    }                  
                }
            }
        }
    }
}
