const express = require('express');
const expressLayouts = require ('express-ejs-layouts');
const dotenv = require('dotenv');
const morgan = require('morgan');
const db = require('./db/db');

const expenseRouter = require('./routes/expense.router');
const authRouter = require('./routes/auth.router');

//inicializar ficheiro .env
dotenv.config();

//criar servidor com express
const app = express();

//criar middleware para logar informação dos requests
app.use(morgan('combined'));
//criar middleware para devolver respostas json
app.use(express.json());

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser - para os forms
app.use(express.urlencoded({ extended: false}));

//usar as rotas
app.get('/', (req,res) =>{
    res.render('home')
});
app.get('/dashboard', (req,res) =>{
    res.render('dashboard')
});
app.use('/expenses',expenseRouter);
app.use('/auth',authRouter);

app.listen(process.env.PORT);