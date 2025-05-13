// router/productrouter.js

const express = require('express');
const { createproductc, getproductsc, getproductbyidc, updateproductc, deleteproductc } = require('../../controller/productcontroller');
const upload = require('../../middleware/multer'); // multer middleware for file uploads
const productrouter = express.Router();

// Route for creating a product (POST)
productrouter.post('/', upload.single('image'), createproductc);

// Route for getting all products (GET)
productrouter.get('/', getproductsc);

// Route for getting a single product by ID (GET)
productrouter.get('/:id', getproductbyidc);

// Route for updating a product (PUT)
productrouter.put('/:id', upload.single('image'), updateproductc);

// Route for deleting a product (DELETE)
productrouter.delete('/:id', deleteproductc);

module.exports = productrouter;
