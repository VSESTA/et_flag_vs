const { getTotalAmountByExpenseId } = require('../models/expense.model');
const {addUserToExpense, getSharedExpenseByExpenseId} = require('../models/sharedexpense.model');

async function httpAddUserToExpense(req, res, next){
    const {userId} = req;

    const expense_id = req.params.id;
    const expense_user = {
        user_id: req.body.user_id,
        owner_id: userId,
        amount: req.body.amount,
        status_id: req.body.status_id
    };
    
    let errors = [];

    //verificar que todos os campos obrigatórios estão preenchidos
    if(!expense_user.owner_id || !expense_user.amount || !expense_user.status_id){
        errors.push('Missing fields required')
    }
    //verificar que o user não é o mesmo que o owner id
    if(Number(expense_user.user_id) === expense_user.owner_id){
        errors.push('User to split expense is the same as owner of expense');
    }

    // verficar que o amount não é maior que o total amount
    const totalAmount = await getTotalAmountByExpenseId(expense_id);

    const sharedExpenses = await getSharedExpenseByExpenseId(expense_id);

    const sumSharedAmounts = sharedExpenses.reduce((acc, sharedExpense) => acc+Number(sharedExpense.amount), 0);

    if(Number(sumSharedAmounts) + Number(expense_user.amount) > Number(totalAmount)){
        errors.push('Sum of shared expenses is higher than expense total amount')
    }

    sharedExpenses.forEach(sharedExpense =>{
        if(Number(sharedExpense.user_id) === Number(expense_user.user_id)){
            errors.push('User already sharing expense. Please update the value')
            return;
        }
    });

    if(errors.length >0){
        console.log(errors);
        return res.redirect(`/share-expense/${expense_id}`);
    }

    const result = await addUserToExpense(expense_id, expense_user.user_id, expense_user.owner_id, expense_user.amount, expense_user.status_id);

    res.redirect(`/share-expense/${expense_id}`);
}

async function httpGetAllUsersByExpenseId(req, res, next){}

module.exports = {httpAddUserToExpense, httpGetAllUsersByExpenseId};