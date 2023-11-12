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
const historyRouter = require('./routes/history.router');
const dashboardRouter = require('./routes/dashboard.router');

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

app.use('/expenses',expenseRouter);
app.use('/user', userRouter);
app.use('/auth',authRouter);
app.use('/history', historyRouter);
app.use('/dashboard', dashboardRouter);

app.listen(process.env.PORT);