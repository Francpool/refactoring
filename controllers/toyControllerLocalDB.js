const Toy = require('../models/toyModelLocalDB');

async function getToys(req, res) {
  try {
    const toys = await Toy.find(); // Obtener todos los juguetes desde la base de datos
    res.status(200).json({
      status: 'success',
      data: toys,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch toys',
      error: error.message,
    });
  }
}

// Crear un nuevo juguete
async function createToy(req, res) {
  try {
    const newToy = await Toy.create(req.body); // Crear un nuevo juguete
    res.status(201).json({
      status: 'success',
      data: newToy,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error while creating toy',
      error: error.message,
    });
  }
}

// Obtener un juguete por ID
async function getToy(req, res) {
  try {
    const toy = await Toy.findById(req.params.id);
    if (!toy) {
      return res.status(404).json({ status: 'error', message: 'Toy does not found' });
    }
    res.status(200).json({ status: 'success', data: toy });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error while fetching toy', error: error.message });
  }
}

// Actualizar un juguete
async function updateToy(req, res) {
    try {
        const updateToy = await Toy.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updateToy) {
            return res.status(404).json({ status: 'error', message: 'Toy does not found' });
        }
        res.status(200).json({ status: 'success', data: updateToy });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: 'Something wrong updating toy', error: error.message });
    }   
}
    // Eliminar un juguete
async function deleteToy(req, res) {
  try {
    const deletedToy = await Toy.findByIdAndDelete(req.params.id);
    if (!deletedToy) {
      return res.status(404).json({ status: 'error', message: 'Toy does not found' });
    }
    res.status(204).json({ status: 'success', message: 'Toy deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error while deleting toy', error: error.message });
  }
}
module.exports = {
  getToys,
  createToy,
  getToy,
  updateToy,
  deleteToy
};