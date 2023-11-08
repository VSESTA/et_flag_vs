const db = require('../db/db');
const { getCurrentDate } = require('../utils/dates.utils');

//obtem os detalhes de uma despesa partilhada
async function getSharedExpenseByExpenseId(id){
    let sql = `SELECT expense_user.user_id, user.name, expense_user.amount, status.name as status 
                FROM expense_user
                INNER JOIN user ON expense_user.user_id = user.id
                INNER JOIN status ON expense_user.status_id = status.id
                WHERE expense_user.expense_id = ${id}`;
    const [sharedExpense,_] = await db.execute(sql);
    return sharedExpense;
}

//obtem todas as despesas a decorrer que um utilizador tem
async function getSharedExpensesByUserId(id){
    let sql = `SELECT * 
                FROM expense
                INNER JOIN status on expense.status_id = status.id AND status.name in ("ACTIVE","ON-HOLD")
                LEFT JOIN expense_user ON expense.id = expense_user.expense_id
                WHERE
                (expense.created_by = ${id} OR (expense_user.user_id = ${id} AND expense_user.owner_id<>expense.user_id))
                AND expense_user.status_id not in (SELECT id FROM status WHERE status.name = "PAID")
                `;
    const [sharedExpense,_] = await db.execute(sql);
    return sharedExpense;
}

async function addUserToExpense(expense_id, user_id, owner_id, amount, status_id ){
    let sql = `INSERT INTO expense_user(expense_id, user_id, owner_id, amount, status_id, created_at)
                VALUES(
                    '${expense_id}',
                    '${user_id}',
                    '${owner_id}',
                    '${amount}',
                    '${status_id}',
                    '${getCurrentDate()}'
                )`;
    const [result, ...info] = await db.execute(sql);
    return result;
}

async function getExpenseUserById(id){
    let sql = `SELECT * 
    FROM expense_user
    INNER JOIN user ON expense_user.user_id = user.id
    WHERE expense_user.id = ${id}`;
    const [sharedExpense,_] = await db.execute(sql);
    return sharedExpense[0];

}

async function deleteUserByExpenseId(expense_id, user_id){
    const sql = `DELETE FROM expense_user WHERE expense_id = ${expense_id} AND user_id = ${user_id}`;
    const [result, ...info] = await db.execute(sql);
    return result;

}


module.exports={addUserToExpense, getExpenseUserById, getSharedExpenseByExpenseId, deleteUserByExpenseId}