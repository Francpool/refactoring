const Product = require("../models/productModel");

// Obtener todos los productos
async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch products",
      error: error.message,
    });
  }
}

// Crear un nuevo producto
async function createProduct(req, res) {
    try {
     // const newProducts = await Product.insertMany(req.body); // Para múltiples productos
      const newProduct = await Product.create(req.body); // Solo un objeto
      res.status(201).json({
        status: "success",
        data: newProduct,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Error while creating products",
        error: error.message,
      });
    }
  }

// Obtener un producto por ID
async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error while fetching product", error: error.message });
  }
}

// Actualizar un producto
async function updateProduct(req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    res.status(200).json({ status: "success", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Something went wrong updating product", error: error.message });
  }
}

// Eliminar un producto
async function deleteProduct(req, res) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error while deleting product", error: error.message });
  }
}

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
