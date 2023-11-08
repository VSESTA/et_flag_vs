const db = require('../db/db');

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

async function getAllExpenses(){
    const sql = "SELECT * FROM EXPENSE";
    const [result, ...info] = await db.execute(sql);
    return result;

}

async function getExpenseById(id){
    const sql=`SELECT * FROM EXPENSE WHERE id = ${id}`;
    const [result, ...info] = await db.execute(sql);
    return result[0];

}

async function addNewExpense(expense){
    const sql = `INSERT INTO expense(name, date, category_id, total_amount, is_split, status_id, notes, created_by) VALUES(
    "${expense.name}",
    "${expense.date}",
    ${expense.category_id},
    ${expense.total_amount},
    ${expense.is_split},
    ${expense.status_id},
    "${expense.notes}",
    ${expense.created_by})`;

    const [newExpense,...info] = await db.execute(sql);
    return newExpense.insertId;
}

async function updateExpense(id, expense){
    const sql = `UPDATE expense SET 
    name = "${expense.name}",
    date= "${expense.date}",
    category_id = ${expense.category_id},
    total_amount = ${expense.total_amount},
    is_split = ${expense.is_split},
    status_id = ${expense.status_id},
    notes = "${expense.notes}",
    updated_by = ${expense.updated_by}
    WHERE
    id = ${id}`;

    const [expenseDb,_] = await db.execute(sql);
    return expenseDb;
}

async function deleteExpense(id){
    const sql = `DELETE FROM expense WHERE id =${id}`;
    const [expense,_] = await db.execute(sql);
    return expense;
}

async function getTotalAmountByExpenseId(id){
    const sql = `SELECT total_amount FROM expense WHERE id = ${id}`;
    const [result, ...info] = await db.execute(sql);
    return result[0].total_amount;
}

module.exports = {
    getAllExpenses,
    getExpenseById,
    addNewExpense,
    updateExpense,
    deleteExpense,
    getTotalAmountByExpenseId
};