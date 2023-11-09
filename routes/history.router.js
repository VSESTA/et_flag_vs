const express = require('express');
const authorization = require('../middleware/authorization');

const {httpGetAllExpenses} = require('./expense.controller');

//criar um objecto para as rotas
const historyRouter = express.Router();

//obter todas as despesas por utilizador logado
historyRouter.get('/',authorization, httpGetAllExpenses);

module.exports = historyRouter;