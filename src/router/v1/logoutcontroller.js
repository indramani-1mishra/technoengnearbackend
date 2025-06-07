const express =require('express');
const { Logout } = require('../../controller/logoutcontroller');
const logoutRouter= express.Router();

logoutRouter.get('/',Logout);
module.exports= logoutRouter;