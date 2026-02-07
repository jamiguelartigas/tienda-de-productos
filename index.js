const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const routes = require('./routes/productRoutes');
const dbConnection = require('./config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/', routes);

dbConnection();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});