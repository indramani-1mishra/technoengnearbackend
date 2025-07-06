const express = require('express');
const {
  createproductc,
  getproductsc,
  getproductbyidc,
  updateproductc,
  deleteproductc,
  fetchProductByCategoryOrName
} = require('../../controller/productcontroller');
const upload = require('../../middleware/multer');
const { isLoggedIn, isAdmin } = require('../../validetor/isloggedin');

const productrouter = express.Router();

productrouter.post(
  '/',
  isLoggedIn,
  isAdmin,
  upload.fields([
    { name: 'images', maxCount: 3 },
    { name: 'video', maxCount: 1 },
  ]),
  createproductc
);
productrouter.get('/', getproductsc);
productrouter.get('/search/:searchTerm', fetchProductByCategoryOrName); // ✅ fixed route
productrouter.get('/:id',getproductbyidc);
productrouter.put('/:id', upload.single('image'), updateproductc);
productrouter.delete('/:id', deleteproductc);

module.exports = productrouter;
