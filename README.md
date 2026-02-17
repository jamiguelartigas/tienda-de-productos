Esta aplicación es de una tienda de productos: camisetas, pantalones, zapatos y accesorios.

Para hacer funcionar esta aplicación necesitaremos instalar:

- Express
- Mongoose
- Cloudinary
- Multer
- Streamifier
- Method-override (para poder hacer PUT y DELETE en el formulario)

Usamos variables de entorno. Revisar el archivo .env.example

Para las imágenes utilizamos Cloudinary y Multer para gestionar la subida directamente desde el backend.

Las rutas que manejaremos:

GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
GET /products/:productId: Devuelve el detalle de un producto.
GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
POST /dashboard: Crea un nuevo producto.
GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
PUT /dashboard/:productId: Actualiza un producto.
DELETE /dashboard/:productId/delete: Elimina un producto.
