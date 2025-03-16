const express = require("express");
const router = express.Router();
const toyController = require("../controllers/toyController");

router.get("/", toyController.getToys);
router.post("/", toyController.createToy);
router.get("/:id", toyController.getToy);
// Ruta para actualizar un juguete por ID
router.patch("/:id", toyController.updateToy);

module.exports = router;
