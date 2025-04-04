const mongoose = require('mongoose');
const { connectLocalDB } = require('../config/driverMongo.DB'); // Importamos la conexión a la base de datos local
const toySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String, required: true },
    price: { type: Number, required: true }
});
const localDB = connectLocalDB(); // Conectamos a MongoDB local
const Toy = localDB.model('Toy', toySchema);

module.exports = Toy;