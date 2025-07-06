// controller/productcontroller.js

const { video, image } = require("../config/cloudneryconfig");
const { createproducts, getProducts, getProduct, updateproducts, deleteproducts, getProductByCategoryOrName } = require("../service/productservice");

// Create Product
const createproductc = async (req, res) => {
  console.log(req.files);
   const files = req.files;
  const image = files?.images;
    const video = files?.video?.[0]?.path || '';

   // console.log(image+"images");
  try {
    // Parse JSON strings if sent via FormData
    const features = req.body.features
      ? typeof req.body.features === 'string'
        ? JSON.parse(req.body.features)
        : req.body.features
      : [];

    const specialFeatures = req.body.specialFeatures
      ? typeof req.body.specialFeatures === 'string'
        ? JSON.parse(req.body.specialFeatures)
        : req.body.specialFeatures
      : [];

    const technicalSpecs = req.body.technicalSpecs
      ? typeof req.body.technicalSpecs === 'string'
        ? JSON.parse(req.body.technicalSpecs)
        : req.body.technicalSpecs
      : {};

    const externalLinks = req.body.externalLinks
      ? typeof req.body.externalLinks === 'string'
        ? JSON.parse(req.body.externalLinks)
        : req.body.externalLinks
      : [];

    const productData = {
      name: req.body.name,
      
      minOrderQty: req.body.minOrderQty,
     
      brand: req.body.brand,
     
      
      application: req.body.application,
      brochureUrl: req.body.brochureUrl,
      
      color: req.body.color,
      category: req.body.category,
      features,
      specialFeatures,
      technicalSpecs,
      externalLinks,
     image,
      video,
    };

    const response = await createproducts(productData);

    return res.status(201).json({
      message: 'Product created successfully',
      status: 201,
      data: response,
      error: {},
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({
      message: 'Failed to create product',
      status: 500,
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
const fetchProductByCategoryOrName = async (req, res) => {
  try {
    const { searchTerm } = req.params;
    console.log("Search term:", searchTerm);

    if (!searchTerm) {
      return res.status(400).json({ message: "Search parameter is required." });
    }

    const product = await getProductByCategoryOrName(searchTerm);

    if (!product || product.length === 0) {
      return res.status(404).json({ message: "No product found with the given category or name." });
    }

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Controller Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = {
  createproductc,
  getproductsc,
  getproductbyidc,
  updateproductc,
  deleteproductc,
  fetchProductByCategoryOrName
};
