const express = require('express');
const v1router = require('./v1/v1router');
const apirouter= express.Router();
apirouter.use('/v1',v1router);
module.exports=apirouter;