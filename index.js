
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');


//Crear el servidor/aplicación de express
const app = express();

//Base de datos
dbConnection();

//Directorio Público
app.use(express.static('public'));

//CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));

//Definición de la dirección de acceso al servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});