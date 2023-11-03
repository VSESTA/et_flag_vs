const express = require('express');
const authorization = require('../middleware/authorization');
const {getUserProfile, saveUserProfile} = require('./user.controller');

//criar um objecto para as rotas
const userRouter = express.Router();

userRouter.get('/profile', authorization, getUserProfile);
userRouter.post('/profile', authorization, saveUserProfile);

module.exports=userRouter;