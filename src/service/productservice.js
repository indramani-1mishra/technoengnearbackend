// service/productService.js

const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, findProductByCategoryOrName } = require("../repository/productrepository");
const cloudinary = require("../config/cloudneryconfig");
const fs = require('fs');

// Create Product
const createproducts = async (productdetails) => {
  try {
    const images = productdetails.image;
    const {video} =productdetails;
    console.log(images,"image",video,"video");
    if (!productdetails.image || productdetails.image.length === 0) {
  throw new Error("At least one image is required");
}

    // Upload all images to Cloudinary
    const uploadedImages = await Promise.all(
      images.map(async (imgObj) => {
        const uploadRes = await cloudinary.uploader.upload(imgObj.path); // ✅ FIXED
        // Delete local file after upload
        if (fs.existsSync(imgObj.path)) {
          fs.unlinkSync(imgObj.path); // ✅ FIXED
        }
        return uploadRes.secure_url;
      })
    );
  const videourl = async (video) => {
  try {
    if (!video) return null;

    const videoupload = await cloudinary.uploader.upload(video, {
      resource_type: 'video', // Must for video files
      folder: 'product-videos',
    });

    const secureUrl = videoupload.secure_url;

    // Optional: Delete local file
    if (fs.existsSync(video)) {
      fs.unlinkSync(video);
    }

    return secureUrl;
  } catch (err) {
    console.error('Video upload failed:', err.message);
    throw err;
  }
};

const videoUrl1 = await videourl(video);

    // Save to database
    const response = await createProduct({
      ...productdetails,
      images: uploadedImages,
      video:videoUrl1,
    });

    if (!response) {
      throw new Error("Cannot upload product data");
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


const getProductByCategoryOrName = async (searchTerm) => {
  try {
    const response = await findProductByCategoryOrName(searchTerm);
    return response;
  } catch (error) {
    console.error("Error in fetching product:", error.message);
    throw error;
  }
};

module.exports = {
  createproducts,
  getProducts,
  getProduct,
  updateproducts,
  deleteproducts,
  getProductByCategoryOrName
};
