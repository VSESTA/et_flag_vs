const { getAllExpenses } = require('../models/expense.model');

function httpGetAllExpenses(req, res){
    console.log(getAllExpenses());
    return res.status(200).json(getAllExpenses());
}

function httpAddNewExpense(req, res){
    return;
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