const Person = require("../models/Person");

// Obtener todas las personas
async function getPeople(req, res) {
  try {
    const people = await Person.find(); // Obtener todas las personas desde la base de datos
    res.status(200).json({
      status: "success",
      data: people,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user person",
      error: error.message,
    });
  }
}

// Crear una nueva persona
async function createPerson(req, res) {
  try {
    const newPerson = await Person.create(req.body); // Crear una nueva persona
    res.status(201).json({
      status: "success",
      data: newPerson,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error whilw creating person",
      error: error.message,
    });
  }
}

// Obtener una persona por ID
async function getPerson(req, res) {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ status: "error", message: "Person does nor found" });
    }
    res.status(200).json({ status: "success", data: person });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error while fetching person", error: error.message });
  }
}

// Actualizar una persona
async function updatePerson(req, res) {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPerson) {
      return res.status(404).json({ status: "error", message: "Person does not found" });
    }
    res.status(200).json({ status: "success", data: updatedPerson });
  } catch (error) {
    res.status(500).json({ status: "error", message: "somethig wrong updating person", error: error.message });
  }
}

// Eliminar una persona
async function deletePerson(req, res) {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) {
      return res.status(404).json({ status: "error", message: "Person do not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error while deleting person", error: error.message });
  }
}

module.exports = {
  getPeople,
  createPerson,
  getPerson,
  updatePerson,
  deletePerson,
};
