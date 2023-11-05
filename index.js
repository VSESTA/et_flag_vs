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

app.get('/submit-expense', authorization, (req,res) =>{
    const {userId, userName, isAdmin} = req;
    let expense = {
        name: "",
        date: getCurrentDate(),
        category: 1,
        is_split: false
    }
    res.render('submit-expense', {userId, userName, expense});
})

app.get('/share-expense/:id', authorization, async (req,res) =>{
    const {userId, userName} = req;
    let expenseId = req.params.id;
    let response = await getExpenseById(expenseId);
    let expense = response[0];

    let users = await getSharedExpenseByExpenseId(expenseId);

    res.render('share-expense',{userId, userName,expense, users})
})


app.use('/expenses',expenseRouter);
app.use('/user', userRouter);
app.use('/auth',authRouter);

app.listen(process.env.PORT);