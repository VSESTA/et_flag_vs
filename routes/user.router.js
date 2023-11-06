const express = require('express');
const authorization = require('../middleware/authorization');
const {getUserProfile, saveUserProfile, httpGetAllUsers} = require('./user.controller');

//criar um objecto para as rotas
const userRouter = express.Router();

userRouter.get('/profile', authorization, getUserProfile);
userRouter.post('/profile', authorization, saveUserProfile);
userRouter.get('/', authorization, httpGetAllUsers);

module.exports=userRouter;