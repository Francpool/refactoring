const express = require('express');
const router = express.Router();
const toyControllerLocalDB = require('../controllers/toyControllerLocalDB');

router.get('/', toyControllerLocalDB.getToys); // Obtener todos los juguetes
router.post('/', toyControllerLocalDB.createToy); // Crear un nuevo juguete
router.get('/:id', toyControllerLocalDB.getToy); // Obtener un juguete por ID
router.patch('/:id', toyControllerLocalDB.updateToy); // Actualizar un juguete por ID
router.delete('/:id', toyControllerLocalDB.deleteToy); // Eliminar un juguete por ID

module.exports = router;