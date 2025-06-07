const express = require('express');
const { createUserc, getUserByIdc } = require('../../controller/usercontroller');
const { isLoggedIn } = require('../../validetor/isloggedin');
const userrouter= express.Router();

userrouter.post('/',createUserc);
userrouter.get('/:id',getUserByIdc);
module.exports=userrouter;