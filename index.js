const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const routes = require('./routes/productRoutes');
const ApiRoutes = require('./routes/productApiRoutes');
const dbConnection = require('./config/db');
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static("public"));

app.use('/', routes);
app.use('/api', ApiRoutes);

dbConnection();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});