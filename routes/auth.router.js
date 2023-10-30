const express = require('express');
const authorization = require('../middleware/authorization');


const {register, login, logout} = require('./auth.controller');

//criar um objecto para as rotas
const authRouter = express.Router();

authRouter.get('/register', (req,res) => res.render('register'));
authRouter.get('/login', (req,res) => res.render('login'));
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/logout',authorization, logout);

module.exports=authRouter;