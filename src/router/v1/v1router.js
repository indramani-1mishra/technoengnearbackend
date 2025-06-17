const express = require('express');
const productrouter = require('./productrouter.js');
const userrouter = require('./userRouter.js');
const loginRouter = require('./loginrouter.js');
const logoutRouter = require('./logoutcontroller.js');
const likeRouter = require('./likerouter.js');
const v1router= express.Router();
v1router.use('/products',productrouter);
v1router.use('/users',userrouter);
v1router.use('/user/login',loginRouter);
v1router.use('/user/logout',logoutRouter);
v1router.use("/like",likeRouter);

module.exports=v1router;