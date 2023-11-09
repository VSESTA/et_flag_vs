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
    let sql = `SELECT
                    expense.id,
                    expense.name,
                    (SELECT expense.total_amount - COALESCE(SUM(aux.amount),0)
                        FROM expense_user aux
                        WHERE aux.expense_id = expense.id AND aux.user_id <> expense.created_by) AS due_amount,
                    expense.total_amount AS total_amount,
                    'me' AS user,
                    expense.date,
                    category.name AS category,
                    status.name AS status,
                    expense.is_split
                FROM
                    expense
                INNER JOIN status ON expense.status_id = status.id
                INNER JOIN category ON expense.category_id = category.id
                WHERE
                    expense.created_by = ${id}
                UNION ALL
                SELECT
                    expense.id,
                    expense.name,
                    expense_user.amount AS due_amount,
                    expense.total_amount AS total_amount,
                    user.name AS user,
                    expense.date,
                    category.name AS category,
                    status.name AS status,
                    expense.is_split
                FROM
                    expense
                INNER JOIN STATUS ON expense.status_id =status.id 
                INNER JOIN category ON expense.category_id = category.id
                INNER JOIN expense_user ON expense.id = expense_user.expense_id
                INNER JOIN USER ON expense_user.owner_id = user.id
                WHERE
                    expense_user.user_id = ${id} AND expense_user.owner_id <> expense_user.user_id
                ORDER BY date DESC
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


module.exports={addUserToExpense, 
                getExpenseUserById, 
                getSharedExpenseByExpenseId, 
                getSharedExpensesByUserId,
                deleteUserByExpenseId}