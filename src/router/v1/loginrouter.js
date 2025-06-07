const express = require('express');
const { LoginController } = require('../../controller/logincontroller');
const loginRouter= express.Router();

loginRouter.post('/',LoginController);
module.exports=loginRouter;