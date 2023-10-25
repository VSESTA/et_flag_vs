const express = require('express');
const {httpGetAllExpenses, httpGetExpenseById, httpAddNewExpense,httpUpdateExpense, httpDeleteExpense} = require('./expense.controller');

//criar um objecto para as rotas
const expenseRouter = express.Router();

expenseRouter.get('/', httpGetAllExpenses);
expenseRouter.get('/:id', httpGetExpenseById);
expenseRouter.post('/', httpAddNewExpense);
expenseRouter.put('/:id', httpUpdateExpense);
expenseRouter.delete('/:id', httpDeleteExpense);

module.exports = expenseRouter;