const express = require('express');
const authorization = require('../middleware/authorization');

const {httpGetAllExpenses, httpGetExpenseById, httpAddNewExpense,httpUpdateExpense, httpDeleteExpense, httpLoadExpensePage} = require('./expense.controller');
const {httpAddUserToExpense, httpDeleteUserByExpenseId, httpLoadExpenseUserPage} = require('./expense-user.controller');


//criar um objecto para as rotas
const expenseRouter = express.Router();

//obter todas as despesas por utilizador logado
expenseRouter.get('/history',authorization, httpGetAllExpenses);

//obter página para criar despesa
expenseRouter.get('/', authorization, httpLoadExpensePage);

//criar nova despesa
expenseRouter.post('/', authorization, httpAddNewExpense);

//obter página para criar users na despesa
expenseRouter.get('/:id/users', authorization, httpLoadExpenseUserPage);

//criar novo user na despesa
expenseRouter.post('/:id/addUser', authorization, httpAddUserToExpense);

//visualizar detalhe da despesa
expenseRouter.get('/:id', httpGetExpenseById);

expenseRouter.post('/:id', authorization, httpUpdateExpense);

expenseRouter.delete('/:id', authorization, httpDeleteExpense);

expenseRouter.get('/:id/removeUser/:user_id', httpDeleteUserByExpenseId)

module.exports = expenseRouter;