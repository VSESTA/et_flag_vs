const express = require('express');
const authorization = require('../middleware/authorization');
const {getUserProfile, saveUserProfile, httpGetAllUsers} = require('./user.controller');
const {httpUpdateUserPassword} = require('./auth.controller');

//criar um objecto para as rotas
const userRouter = express.Router();

userRouter.get('/profile', authorization, getUserProfile);
userRouter.post('/profile', authorization, saveUserProfile);
userRouter.get('/', authorization, httpGetAllUsers);
userRouter.post('/password', authorization, httpUpdateUserPassword);

module.exports=userRouter;