const { getExpenseById, addNewExpense, updateExpense, deleteExpense } = require('../models/expense.model');
const {getSharedExpensesByUserId} = require('../models/sharedexpense.model');
const { httpGetAllActiveCategories } = require('./category.controller');
const { httpGetAllStatuses } = require('./status.controller');
const { getCurrentDate } = require('../utils/dates.utils');

async function httpGetAllExpenses(req, res, next){
    //TO-DO:adicionar validacao do authorization
    const {userId, userName,isAdmin} = req;
    try{
        const expenses = await getSharedExpensesByUserId(userId);

        res.render('expense-list',{userId, userName, isAdmin, expenses})

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
    const {userId, userName, isAdmin} = req;
    const id = req.params.id;
    try{
        const expense = await getExpenseById(id);
    //categorias
    const categories = await httpGetAllActiveCategories(req,res);

    //status
    const statuses = await httpGetAllStatuses(req,res);

    res.render('expense-detail', {id, userId, userName,isAdmin, expense, categories, statuses});

        //Comentado porque vou usar EJS e não a criar API
        /*return res.status(200).json({
            success: true,
            data: expense
        });*/

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

    const {userId, userName, isAdmin} = req;
    let expense = {
        name:           req.body.name,
        date:           req.body.date,
        category_id:    req.body.category_id,
        total_amount:   req.body.total_amount,
        is_split:       typeof(req.body.is_split) == "undefined" ? 0 : 1,
        status_id:      req.body.status_id,
        notes:          req.body.notes,
        created_by:     userId
    };

    //adicionar validaçao
    const errors = validateExpenseInputs(expense);


    if(errors.length >0){
        //categorias
        const categories = await httpGetAllActiveCategories(req,res);
        //status
        const statuses = await httpGetAllStatuses(req,res);
        res.render('expense-detail', {userId, userName,isAdmin, expense, errors, statuses, categories});
    }else{
        try {
            let newExpenseId = await addNewExpense(expense);
     
            if(expense.is_split){
             res.redirect(`/expenses/${newExpenseId}/users`);
            }else{
             res.redirect('/dashboard');
            }  
            //Comentado porque vou usar EJS e não a criar API
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

    
}

async function httpUpdateExpense(req, res){
    //TO-DO:adicionar validacao do authorization
    let id = req.params.id;
    const {userId, isAdmin} = req;
    let expense = {
        name:           req.body.name,
        date:           req.body.date,
        category_id:    req.body.category_id,
        total_amount:   req.body.total_amount,
        is_split:       typeof(req.body.is_split) == "undefined" ? 0 : 1,
        status_id:      req.body.status_id,
        notes:          req.body.notes,
        updated_by:     userId
    }

    try {
        let expenseX = await getExpenseById(id);
        if(expenseX.length===0){  
            return res.status(404).json({
                success: false,
                error: "No expense found"
            });
        }

        await updateExpense(id, expense);

        if(expense.is_split){
            res.redirect(`/expenses/${id}/users`);
           }else{
            res.redirect('/dashboard');
           }

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
    const id = req.params.id;

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

async function httpLoadExpensePage(req, res, next ){
    const {userId, userName, isAdmin} = req;
    const id = req.params.id;
    let expense = {
        name: "",
        date: getCurrentDate(),
        category: "",
        is_split: false
    }
    //categorias
    const categories = await httpGetAllActiveCategories(req,res);

    //status
    const statuses = await httpGetAllStatuses(req,res);

    res.render('expense-detail', {userId, userName,isAdmin, expense, categories, statuses});
}

function validateExpenseInputs(expense){
    let errors = [];
    if(!expense.name || !expense.date || !expense.category_id || !expense.total_amount || !expense.status_id ){
        errors.push({ message: 'Missing fields required'})
    }
    return errors;
}

module.exports = {
    httpGetAllExpenses, 
    httpGetExpenseById,
    httpAddNewExpense,
    httpUpdateExpense,
    httpDeleteExpense,
    httpLoadExpensePage
}