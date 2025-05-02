const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas para manejar productos
router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
router.get("/:id", productController.getProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
