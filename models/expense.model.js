const mysql = require('mysql');

const expenses = [
    {
        id: 1,
        name: "Conta da água",
        amount: 40.06,
        date: new Date("October 22, 2023")
    },
    {
        id: 2,
        name: "Conta da luz",
        amount: 70.45,
        date: new Date("October 23, 2023")
    }
];

function getAllExpenses(){
    return expenses;

}

module.exports = {
    getAllExpenses
};