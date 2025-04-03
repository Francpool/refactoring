const mongoose = require('mongoose');

const connectDbLocal = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/PaulDb');
        console.log('Conectado a MongoDBLocal');
    } catch (err) {
        console.error('Error de conexión:', err);
        process.exit(1); // Salir del proceso si la conexión falla
    }
};

module.exports = connectDbLocal;