const mongoose = require('mongoose');
const { connectCloudDB } = require('../config/driverMongo.DB'); // Importamos la conexión a la base de datos
// Definir el esquema de la persona
const personSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  birth: { type: Date, required: true },
  death: { type: Date, required: true },
  contribs: [String],
  views: { type: Number, required: true }
});
const cloudDB = connectCloudDB(); // Conectamos a MongoDB en la nube
// Crear un modelo basado en el esquema
const Person = cloudDB.model('Person', personSchema);

module.exports = Person;