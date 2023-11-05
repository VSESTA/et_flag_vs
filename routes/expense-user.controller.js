const { getExpenseById } = require('../models/expense.model');
const {addUserToExpense} = require('../models/sharedexpense.model');

async function httpAddUserToExpense(req, res, next){
    const {userId} = req;
    const expense_id = req.params.id;
    const expense_user = {
        user_id: req.body.user_id,
        owner_id: userId,
        amount: req.body.amount,
        status_id: req.body.status_id
    };
    //validações....TODO

    //verificar que o user não é o mesmo que o owner id
    // verficar que o amount não é maior que o total amount
    let result = await addUserToExpense(expense_id, expense_user.user_id, expense_user.owner_id, expense_user.amount, expense_user.status_id);

    res.redirect(`/share-expense/${expense_id}`);
}

module.exports = {httpAddUserToExpense};