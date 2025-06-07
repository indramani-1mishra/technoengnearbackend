const express = require('express');
const productrouter = require('./productrouter.js');
const userrouter = require('./userRouter.js');
const loginRouter = require('./loginrouter.js');
const logoutRouter = require('./logoutcontroller.js');
const v1router= express.Router();
v1router.use('/products',productrouter);
v1router.use('/users',userrouter);
v1router.use('/user/login',loginRouter);
v1router.use('/user/logout',logoutRouter);

module.exports=v1router;