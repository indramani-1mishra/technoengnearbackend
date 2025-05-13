const express = require('express');
const productrouter = require('./productrouter.js');
const v1router= express.Router();
v1router.use('/products',productrouter);
module.exports=v1router;