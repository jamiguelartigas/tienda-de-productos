## TIENDA DE PRODUCTOS

Aplicación web desarrollada con Node.js, Express y MongoDB que permite gestionar productos mediante panel administrador y API REST.

## Demo online

https://tienda-de-productos-projectbreak2-s15-16.onrender.com

⚠️ El servidor puede tardar unos segundos en arrancar si está en reposo.

## Documentación API

https://tienda-de-productos-projectbreak2-s15-16.onrender.com/api-docs

## Tecnologías usadas:

- Node.js
- Express
- MongoDB + Mongoose
- Multer
- Cloudinary
- Swagger
- Express-session
- Method-override
- Jest
- Supertest

## Instalación

1. Clonar repositorio
   git clone https://github.com/jamiguelartigas/tienda-de-productos

2. Instalar dependencias
   npm install

3. Crear archivo .env

## Ejecutar proyecto

npm start

## Variables de entorno

| Variable       | Descripción         |
| -------------- | ------------------- |
| PORT           | Puerto del servidor |
| SESSION_SECRET | Clave de sesión     |
| ADMIN_USER     | Usuario admin       |
| ADMIN_PASS     | Contraseña admin    |
| MONGO_URI      | URL conexión Mongo  |

## 📁 Estructura del proyecto

```
project
│
├── config/ # Configuración externa
│ ├── cloudinary.js # Configuración Cloudinary
│ └── db.js # Conexión a MongoDB
│
├── controllers/ # Lógica de negocio
│ ├── authController.js
│ ├── productApiController.js
│ └── productController.js
│
├── docs/ # Documentación Swagger
│ ├── basicInfo.js
│ ├── components.js
│ ├── index.js
│ └── products.js
│
├── helpers/ # Generadores HTML y utilidades
│ ├── baseHtml.js
│ ├── getForm.js
│ ├── getFormEdit.js
│ ├── getNavBar.js
│ ├── getProductCard.js
│ ├── getProductCards.js
│ └── loginHtml.js
│
├── middlewares/ # Middlewares personalizados
│ ├── authMiddleware.js
│ |── upload.js
│ └── uploadToCloudinary.js
│
├── models/ # Modelo Mongoose
│ └── Product.js
│
├── public/ # Archivos estáticos
│ ├── images/
│ └── styles.css
│
├── routes/ # Definición de rutas
│ ├── authRoutes.js
│ ├── productApiRoutes.js
│ └── productRoutes.js
│
├── test/ # Tests automatizados
│ └── productController.test.js
│
├── .env.example # Variables de entorno ejemplo
├── .gitignore
├── index.js # Entry point servidor
├── package.json
├── package-lock.json
└── README.md
```

## Funcionalidades

- CRUD completo de productos
- Subida de imágenes
- Panel administrador protegido
- Filtro por categoría
- API REST documentada
- Autenticación con sesión
- Test con jest / supertest

## API Endpoints

GET /api/products → obtener todos  
GET /api/products/:productId → obtener producto  
POST /api/products/ → crear producto  
PUT /api/products/:productId → actualizar  
DELETE /api/products/:productId → borrar

## Autenticación

El acceso a /dashboard está protegido mediante sesión.

Login:
POST /login

Logout:
POST /logout

## Modelo Product

```
{
 nombre: String,
 descripcion: String,
 imagen: String,
 categoria: String,
 talla: String,
 precio: Number
}
```

## Tests

Este proyecto incluye tests automatizados para verificar el correcto funcionamiento de la API.

- Ejecutar tests
  npm test

- Tecnologías usadas:
  · Jest
  · Supertest

- Cobertura actual
- Creación de productos
- Eliminación de productos
- Validaciones
- Respuestas HTTP correctas

## Documentación API con Swagger

Disponible en:
http://localhost:3000/api-docs

## Autor

José Antonio Miguel Artigas
