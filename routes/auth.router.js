const express = require('express');

const {register, login, logout} = require('./auth.controller');

//criar um objecto para as rotas
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

module.exports=authRouter;