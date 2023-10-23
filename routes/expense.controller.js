const { getAllExpenses, addNewExpense } = require('../models/expense.model');

function httpGetAllExpenses(req, res){
    return res.status(200).json(getAllExpenses());
}

function httpAddNewExpense(req, res){
    const newExpense = addNewExpense(req, res)
    return res.status(201).json(newExpense);
}

function httpUpdateExpense(req, res){
    return;
}
function httpDeleteExpense(req, res){
    return;
}

module.exports = {
    httpGetAllExpenses, 
    httpAddNewExpense,
    httpUpdateExpense,
    httpDeleteExpense
}