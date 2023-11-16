const express = require('express');
const authorization = require('../middleware/authorization');
const { httpGetAllUsers, httpResetPassword, httpSwitchStatus, httpSwitchAdmin } = require('./user.controller');
const { httpGetAllCategories, httpGetCategoryById, httpAddCategory } = require('./category.controller');

//criar um objecto para as rotas
const adminRouter = express.Router();

adminRouter.get('/users',authorization,httpGetAllUsers);
adminRouter.get('/users/:id/reset', authorization, httpResetPassword);
adminRouter.get('/users/:id/switchstatus', authorization, httpSwitchStatus);
adminRouter.get('/users/:id/switchadmin', authorization, httpSwitchAdmin);
adminRouter.get('/categories',authorization,httpGetAllCategories);
adminRouter.get('/category/:id',authorization,httpGetCategoryById);
adminRouter.post('/category/',authorization,httpAddCategory);
adminRouter.post('/category/:id',authorization,httpAddCategory);

module.exports= adminRouter;