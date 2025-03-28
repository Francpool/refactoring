const mongoose = require('mongoose');

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

// Crear un modelo basado en el esquema
const Person = mongoose.model('Person', personSchema);

module.exports = Person;