// service/productService.js

const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../repository/productrepository");
const cloudinary = require("../config/cloudneryconfig");
const fs = require('fs');

// Create Product
const createproducts = async (productdetails) => {
  try {
    const image = productdetails.image;

    if (!image) {
      throw ({ message: 'Image is required' });
    }

    // Upload to Cloudinary
    const cloudinaryUpload = await cloudinary.uploader.upload(image);
    const secureUrl = cloudinaryUpload.secure_url;

    // Delete local file after upload
    if (fs.existsSync(image)) {
      fs.unlinkSync(image); // delete local image file
    }

    // Save to database
    const response = await createProduct({
      ...productdetails,
      image: secureUrl,  // assuming schema field is 'images'
    });

    if (!response) {
      throw ({ message: "Cannot upload product data" })
    }

    return response;
  } catch (error) {
    console.error("Error in creating product:", error.message);
    throw error;
  }
};

// Get All Products
const getProducts = async () => {
  try {
    const products = await getAllProducts();
    return products;
  } catch (error) {
    console.error("Error in fetching products:", error.message);
    throw error;
  }
};

// Get Product by ID
const getProduct = async (productId) => {
  try {
    const product = await getProductById(productId);
    if (!product) {
      throw { message: "Product not found" };
    }
    return product;
  } catch (error) {
    console.error("Error in fetching product by ID:", error.message);
    throw error;
  }
};

// Update Product
const updateproducts = async (productId, productdetails) => {
  try {
    const { image } = productdetails;

    if (image) {
      // Upload to Cloudinary if new image is provided
      const cloudinaryUpload = await cloudinary.uploader.upload(image);
      productdetails.image = cloudinaryUpload.secure_url;

      // Delete old image from local storage (optional)
      if (fs.existsSync(image)) {
        fs.unlinkSync(image); // delete local image file
      }
    }

    const updatedProduct = await updateProduct(productId, productdetails);

    if (!updatedProduct) {
      throw ({ message: "Cannot update product data" });
    }

    return updatedProduct;
  } catch (error) {
    console.error("Error in updating product:", error.message);
    throw error;
  }
};

// Delete Product
const deleteproducts = async (productId) => {
  try {
    // Get the product to check if there's an image to delete
    const product = await deleteProduct(productId);
    if (!product) {
      throw { message: "Product not found" };
    }

    // If the product has an image URL, delete it from Cloudinary
    if (product.image) {
      const publicId = product.image.split('/').pop().split('.')[0]; // Extract public ID from URL
      await cloudinary.uploader.destroy(publicId);
    }

    return { message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error in deleting product:", error.message);
    throw error;
  }
};

module.exports = {
  createproducts,
  getProducts,
  getProduct,
  updateproducts,
  deleteproducts
};
