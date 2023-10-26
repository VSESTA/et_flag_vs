const db = require('../db/db');

//obtem os detalhes de uma despesa partilhada
async function getSharedExpenseByExpenseId(id){
    let sql = `SELECT * 
                FROM expense_user
                INNER JOIN user ON expense_user.user_id = user.id
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