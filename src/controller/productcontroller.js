// controller/productcontroller.js

const { createproducts, getProducts, getProduct, updateproducts, deleteproducts } = require("../service/productservice");

// Create Product
const createproductc = async (req, res) => {
  try {
    const response = await createproducts({
      name: req.body.name,
      price: req.body.price,
      minOrderQty: req.body.minOrderQty,
      capacity: req.body.capacity,
      usage: req.body.usage,
      material: req.body.material,
      brand: req.body.brand,
      voltage: req.body.voltage,
      modelType: req.body.modelType,
      application: req.body.application,
      features: req.body.features,
      image: req.file ? req.file.path : null, // Image is optional, so add conditional check
      brochureUrl: req.body.brochureUrl,
      category: req.body.category,
    });

    return res.status(201).json({
      message: "Product created successfully",
      status: 201,
      data: response,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Failed to create product",
      status: 404,
      data: {},
      error: error.message,
    });
  }
};

// Get All Products
const getproductsc = async (req, res) => {
  try {
    const products = await getProducts();
    return res.status(200).json({
      message: "Products fetched successfully",
      status: 200,
      data: products,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch products",
      status: 500,
      data: {},
      error: error.message,
    });
  }
};

// Get Product by ID
const getproductbyidc = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProduct(productId);

    return res.status(200).json({
      message: "Product fetched successfully",
      status: 200,
      data: product,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Product not found",
      status: 404,
      data: {},
      error: error.message,
    });
  }
};

// Update Product
const updateproductc = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductDetails = {
      name: req.body.name,
      price: req.body.price,
      minOrderQty: req.body.minOrderQty,
      capacity: req.body.capacity,
      usage: req.body.usage,
      material: req.body.material,
      brand: req.body.brand,
      voltage: req.body.voltage,
      modelType: req.body.modelType,
      application: req.body.application,
      features: req.body.features,
      image: req.file ? req.file.path : null, // Optional: Add condition for image
      brochureUrl: req.body.brochureUrl,
      category: req.body.category,
    };

    const response = await updateproducts(productId, updatedProductDetails);

    return res.status(200).json({
      message: "Product updated successfully",
      status: 200,
      data: response,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Failed to update product",
      status: 404,
      data: {},
      error: error.message,
    });
  }
};

// Delete Product
const deleteproductc = async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await deleteproducts(productId);

    return res.status(200).json({
      message: "Product deleted successfully",
      status: 200,
      data: response,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Failed to delete product",
      status: 404,
      data: {},
      error: error.message,
    });
  }
};

module.exports = {
  createproductc,
  getproductsc,
  getproductbyidc,
  updateproductc,
  deleteproductc,
};
