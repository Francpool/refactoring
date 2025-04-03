

const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

// Rutas para manejar personas
router.get("/", personController.getPeople);
router.post("/", personController.createPerson);
router.get("/:id", personController.getPerson);
router.patch("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

module.exports = router;