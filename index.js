const express = require('express');
const expressLayouts = require ('express-ejs-layouts');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const db = require('./db/db');
const authorization = require('./middleware/authorization');
const expenseRouter = require('./routes/expense.router');
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router');
const { getCurrentDate } = require('./utils/dates.utils');
const { getExpenseById } = require('./models/expense.model');
const { getSharedExpenseByExpenseId } = require('./models/sharedexpense.model');
const { httpGetAllCategories } = require('./routes/category.controller');
const { httpGetAllStatuses } = require('./routes/status.controller');
const { httpGetAllUsers } = require('./routes/user.controller');

//inicializar ficheiro .env
dotenv.config();

//criar servidor com express
const app = express();

//criar middleware para logar informação dos requests
app.use(morgan('combined'));
//criar middleware para devolver respostas json
app.use(express.json());

//criar middleware para usar o cookieParser em todos os requests
app.use(cookieParser());

//carregar os ficheiros de css da pasta public
app.use(express.static(__dirname + '/public'));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser - para os forms
app.use(express.urlencoded({ extended: false}));

//usar as rotas
app.get('/', (req,res) =>{
    const token = req.cookies.access_token;
    if(!token){
        res.render('home')
    }
    else{
        res.redirect('/dashboard');
    }

});
app.get('/dashboard', authorization, (req,res) =>{
    const {userId, userName, isAdmin} = req;
    res.render('dashboard', {userName});
});

app.get('/submit-expense', authorization, async (req,res) =>{
    const {userId, userName, isAdmin} = req;
    let expense = {
        name: "",
        date: getCurrentDate(),
        category: "",
        is_split: false
    }
    //categorias
    let categories = await httpGetAllCategories(req,res);

    //status
    let statuses = await httpGetAllStatuses(req,res);

    res.render('submit-expense', {userId, userName, expense, categories, statuses});
})

app.get('/share-expense/:id', authorization, async (req,res) =>{
    const {userId, userName} = req;
    const expenseId = req.params.id;
    const response = await getExpenseById(expenseId);
    let expense = response[0];

    //combo box users
    const comboUsers = await httpGetAllUsers(req,res);
    //status
    const statuses = await httpGetAllStatuses(req,res);

    const users = await getSharedExpenseByExpenseId(expenseId);

    res.render('share-expense',{userId, userName,expense, users, statuses, comboUsers})
})


app.use('/expenses',expenseRouter);
app.use('/user', userRouter);
app.use('/auth',authRouter);

app.listen(process.env.PORT);