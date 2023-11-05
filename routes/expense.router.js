const express = require('express');
const authorization = require('../middleware/authorization');

const {httpGetAllExpenses, httpGetExpenseById, httpAddNewExpense,httpUpdateExpense, httpDeleteExpense, saveExpense} = require('./expense.controller');

//criar um objecto para as rotas
const expenseRouter = express.Router();

expenseRouter.get('/', httpGetAllExpenses);
expenseRouter.get('/:id', httpGetExpenseById);
expenseRouter.post('/', authorization, httpAddNewExpense);
expenseRouter.put('/:id', authorization, httpUpdateExpense);
expenseRouter.delete('/:id', authorization, httpDeleteExpense);

module.exports = expenseRouter;