const mongoose = require('mongoose');

const connectCloudDB = () => {
    const cloudDB = mongoose.createConnection(
        "mongodb+srv://fpaulvelastegui:1jAg5FD3NB0Nai7N@cluster0.uguihwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    cloudDB.on('connected', () => console.log('Connected to MongoDB in the cloud.'));
    cloudDB.on('error', (err) => console.error('Error in MongoDB in the cloud:', err));

    return cloudDB;
};

const connectLocalDB = () => {
    const localDB = mongoose.createConnection(
        "mongodb://localhost:27017/PaulDb"
    );

    localDB.on('connected', () => console.log('Connected to MongoDB local'));
    localDB.on('error', (err) => console.error('Error en MongoDB local:', err));

    return localDB;
};

// Exportamos ambas conexiones
module.exports = { connectCloudDB, connectLocalDB };
