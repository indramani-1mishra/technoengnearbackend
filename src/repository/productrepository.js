const { search } = require("../router/apiroutes");
const productModel = require("../schema/productschema");

// ✅ Create Product
const createProduct = async (productDetails) => {
  try {
    const response = await productModel.create(productDetails);
    return response;
  } catch (error) {
    console.error("Error in creating product at repository layer:", error.message);
    throw { message: "Error in creating product" };
  }
};

// ✅ Get All Products
const getAllProducts = async () => {
  try {
    const products = await productModel.find();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw { message: "Error fetching products" };
  }
};

// ✅ Get Product by ID
const getProductById = async (id) => {
  try {
    const product = await productModel.findById(id);
    if (!product) {
      throw { message: "Product not found" };
    }
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    throw { message: "Error fetching product by ID" };
  }
};

// ✅ Update Product
const updateProduct = async (id, updateData) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      throw { message: "Product not found to update" };
    }
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error.message);
    throw { message: "Error updating product" };
  }
};

// ✅ Delete Product
const deleteProduct = async (id) => {
  try {
    const deleted = await productModel.findByIdAndDelete(id);
    if (!deleted) {
      throw { message: "Product not found to delete" };
    }
    return deleted;
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw { message: "Error deleting product" };
  }
};

const findProductByCategoryOrName = async (searchTerm) => {
  try {
    const response = await productModel.find({
      $or: [
        { category: searchTerm },
        { name: searchTerm }
      ]
    });
    return response;
  } catch (error) {
    throw { message: "Cannot find product" };
  }
};

const updatedvideo5 = async ({ id, video }) => {
  try {
    const updatedata = await productModel.findByIdAndUpdate(
      id,
      { video: video },
      { new: true }
    );
    return updatedata;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  findProductByCategoryOrName,
  updatedvideo5
};
