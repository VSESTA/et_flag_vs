const { getAllExpenses,getExpenseById, addNewExpense, updateExpense, deleteExpense } = require('../models/expense.model');

async function httpGetAllExpenses(req, res, next){
    try{
        const [expenses,_] = await getAllExpenses();
        return res.status(200).json(expenses);

    }catch(error){
        console.log(error);
        return res.status(500).json({
            "error": "Internal error"
        })
    }

}

async function httpGetExpenseById(req, res, next){
    let id = req.params.id;
    try{
        const [expense,_] = await getExpenseById(id);
        return res.status(200).json(expense);

    }catch(error){
        console.log(error);
        return res.status(500).json({
            "error": "Internal error"
        })
    }
}

 async function httpAddNewExpense(req, res, next){

    let newExpense = {
        name:           req.body.name,
        date:           req.body.date,
        category_id:    req.body.category_id,
        total_amount:   req.body.total_amount,
        is_split:       req.body.is_split,
        status_id:      req.body.status_id,
        notes:          req.body.notes,
        created_by:     req.body.created_by
    };
    try {
       newExpense = await addNewExpense(newExpense);
        return res.status(201).json(newExpense);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Internal error"
        })
        
    }
}

async function httpUpdateExpense(req, res){
    let id = req.params.id;
    let expense = {
        name:           req.body.name,
        date:           req.body.date,
        category_id:    req.body.category_id,
        total_amount:   req.body.total_amount,
        is_split:       req.body.is_split,
        status_id:      req.body.status_id,
        notes:          req.body.notes,
        updated_by:     req.body.updated_by
    }

    try {
        expense = await updateExpense(id, expense);
        return res.status(202).json(expense);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Internal error"
        })
    }
}
async function httpDeleteExpense(req,res){
    let id = req.params.id;

    try {
        expense = await deleteExpense(id);
        return res.status(202).json(id);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "error": "Internal error"
        })
    }
}

module.exports = {
    httpGetAllExpenses, 
    httpGetExpenseById,
    httpAddNewExpense,
    httpUpdateExpense,
    httpDeleteExpense
}