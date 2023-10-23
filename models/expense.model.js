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

function getAllExpenses(){
    const sql = "SELECT * FROM EXPENSE";
    db.query(sql,(err, result) =>{
        if(err){
            throw err;
        }
        console.log(result);
    })
    return expenses;

}

function addNewExpense(req,res){
    let expense = { 
        name: "Luz",
        date: new Date("October 23, 2023"),
        category_id : 1,
        total_amount: 100.23,
        is_split: 0,
        status_id: 1,
        notes: "Luz trimestre agosto - outubro 2023",
        created_at: new Date("October 23, 2023"),
        created_by: 1
    };
    let sql = "INSERT INTO expense SET ?";
    let query = db.query(sql, expense, (err, result) =>{
        if(err) {
            throw err;
        }
        res.send()
    }); 
}

module.exports = {
    getAllExpenses,
    addNewExpense
};