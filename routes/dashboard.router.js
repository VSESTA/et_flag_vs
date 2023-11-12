const express = require('express');
const authorization = require('../middleware/authorization');

const {httpGetDashboard} = require('./dashboard.controller');

//criar um objecto para as rotas
const dashboardRouter = express.Router();

//obter todas as despesas por utilizador logado
dashboardRouter.get('/',authorization, httpGetDashboard);

module.exports = dashboardRouter;