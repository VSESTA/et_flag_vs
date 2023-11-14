const { getTotalAmountByExpenseId, getExpenseById } = require('../models/expense.model');
const {addUserToExpense, getSharedExpenseByExpenseId, deleteUserByExpenseId, getExpenseWithDetailsById,updatePaymentStatusByUserIdAndExpenseId} = require('../models/sharedexpense.model');
const { httpGetAllStatuses } = require('./status.controller');
const { httpGetAllUsers } = require('./user.controller');

async function httpAddUserToExpense(req, res, next){
    const {userId, userName} = req;

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
        errors.push({message: 'Missing fields required'});
    }
    //verificar que o user não é o mesmo que o owner id
    if(Number(expense_user.user_id) === expense_user.owner_id){
        errors.push({message: 'User to split expense is the same as owner of expense'});
    }

    // verficar que o amount não é maior que o total amount
    const totalAmount = await getTotalAmountByExpenseId(expense_id);

    const sharedExpenses = await getSharedExpenseByExpenseId(expense_id);

    const sumSharedAmounts = sharedExpenses.reduce((acc, sharedExpense) => acc+Number(sharedExpense.amount), 0);

    if(Number(sumSharedAmounts) + Number(expense_user.amount) > Number(totalAmount)){
        errors.push({message: 'Sum of shared expenses is higher than expense total amount'})
    }

    sharedExpenses.forEach(sharedExpense =>{
        if(Number(sharedExpense.user_id) === Number(expense_user.user_id)){
            errors.push({message: 'User already sharing expense. Please update the value'})
            return;
        }
    });

    const expense = await getExpenseById(expense_id);

    //combo box users
    const comboUsers = await httpGetAllUsers(req,res);
    //status
    const statuses = await httpGetAllStatuses(req,res);

    if(errors.length >0){
        const users = await getSharedExpenseByExpenseId(expense_id);
        res.render('expense-user', {userId, userName,expense, users, statuses, comboUsers, errors});
    }else{
        const result = await addUserToExpense(expense_id, expense_user.user_id, expense_user.owner_id, expense_user.amount, expense_user.status_id);
        const users = await getSharedExpenseByExpenseId(expense_id);
        res.render('expense-user', {userId, userName,expense, users, statuses, comboUsers});

    }
}

async function httpDeleteUserByExpenseId(req, res, next){
    const {id, user_id} = req.params;
    
    try {
        const response = await deleteUserByExpenseId(id, user_id);
        return res.redirect(`/expenses/${id}/users`)
    } catch (error) {
        console.log(error)
    }
}

async function httpGetAllUsersByExpenseId(req, res, next){}

async function httpLoadExpenseUserPage(req,res){
    const {userId, userName} = req;
    const expenseId = req.params.id;
    
    const expense = await getExpenseById(expenseId);

    //combo box users
    const comboUsers = await httpGetAllUsers(req,res);
    //status
    const statuses = await httpGetAllStatuses(req,res);

    const users = await getSharedExpenseByExpenseId(expenseId);

    res.render('expense-user',{userId, userName,expense, users, statuses, comboUsers})
}

async function httpGetPaymentByExpenseId(req, res, next){
    const {userId, userName} = req;
    const expenseId = req.params.id;

    try {
        const expense = await getExpenseWithDetailsById(expenseId, userId);

        if(userId === expense.user_id){
            return res.render('pay', {expense, userId, userName})
        }else{
            return res.redirect('/dashboard');
        }
    } catch (error) {
        console.log(error)
    }

}


async function httpPayExpense(req, res, next){
    const {userId, userName} = req;
    const id = req.params.id;
    console.log(id)
    try {
        const info = await updatePaymentStatusByUserIdAndExpenseId(id, userId)
        res.redirect('/history')
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = {
    httpAddUserToExpense, 
    httpDeleteUserByExpenseId, 
    httpGetAllUsersByExpenseId, 
    httpLoadExpenseUserPage, 
    httpGetPaymentByExpenseId,httpPayExpense};