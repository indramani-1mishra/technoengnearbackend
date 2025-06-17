const express = require('express');
const { isLoggedIn } = require('../../validetor/isloggedin');
const { Likecontroller, getalllikes, unLikecontroller } = require('../../controller/likeController');
const like = require('../../schema/likedSchema');
const likeRouter = express.Router();

likeRouter.post('/:id',isLoggedIn,Likecontroller);
likeRouter.get('/',getalllikes);
likeRouter.delete('/unlike/:id',isLoggedIn,unLikecontroller);

module.exports=likeRouter;