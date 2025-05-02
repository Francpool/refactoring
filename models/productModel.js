const mongoose = require('mongoose');
const { connectCloudDB } = require('../config/driverMongo.DB'); // Importamos la conexión a la base de datos
// Definir el esquema de la persona
const productSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tags: {
    type: [String], // Array de strings
  },
  age: {
    type: Number,
    min: 0, // Edad mínima opcional
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  }
});
const cloudDB = connectCloudDB(); // Conectamos a MongoDB en la nube
// Crear un modelo basado en el esquema
const Product = cloudDB.model('Product', productSchema);

module.exports = Product; // Exportar el modelo para usarlo en otros archivos