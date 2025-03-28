const mongoose = require('mongoose');
const uri = "mongodb+srv://fpaulvelastegui:1jAg5FD3NB0Nai7N@cluster0.uguihwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
      await mongoose.connect(uri);
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error);
      process.exit(1);  // Si no se puede conectar, termina el proceso
    }
  };
  
  module.exports = connectDB;
