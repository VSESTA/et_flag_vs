const { getAllExpenses,getExpenseById, addNewExpense, updateExpense, deleteExpense } = require('../models/expense.model');

async function httpGetAllExpenses(req, res, next){
    //TO-DO:adicionar validacao do authorization
    try{
        const expenses = await getAllExpenses();
        return res.status(200).json({
            success: true,
            data: expenses
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal error"
        })
    }

}

async function httpGetExpenseById(req, res, next){
    //TO-DO:adicionar validacao do authorization
    let id = req.params.id;
    try{
        const expense = await getExpenseById(id);
        return res.status(200).json({
            success: true,
            data: expense
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal error"
        })
    }
}

 async function httpAddNewExpense(req, res, next){
    //TO-DO:adicionar validacao do authorization

    const {userId} = req;

    let newExpense = {
        name:           req.body.name,
        date:           req.body.date,
        category_id:    req.body.category_id,
        total_amount:   req.body.total_amount,
        is_split:       typeof(req.body.is_split) == "undefined" ? 0 : 1,
        status_id:      1,
        notes:          req.body.notes,
        created_by:     userId
    };
    try {
       let newExpenseId = await addNewExpense(newExpense);

       if(newExpense.is_split){
        res.redirect(`/share-expense/${newExpenseId}`);
       }else{
        res.redirect('/dashboard');
       }

        
       //Comentado porque vou usar EJS e não a API para React
       /*return res.status(201).json({
            success: true,
            data: newDbExpense
        });*/
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal error"
        })
        
    }
}

async function httpUpdateExpense(req, res){
    //TO-DO:adicionar validacao do authorization
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
        let expenseX = await getExpenseById(id);
        if(expenseX.length===0){  
            return res.status(404).json({
                success: false,
                error: "No expense found"
            });
        }

        expense = await updateExpense(id, expense);

        return res.status(202).json(expense);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal error"
        })
    }
}
async function httpDeleteExpense(req,res){
    //TO-DO:adicionar validacao do authorization
    let id = req.params.id;

    try {
        expense = await deleteExpense(id);
        return res.status(202).json({
            success: true,
            id: id
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal error"
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