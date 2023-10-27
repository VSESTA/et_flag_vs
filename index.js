const express = require('express');
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

//usar as rotas
app.use('/expenses',expenseRouter);
app.use('/auth',authRouter);

app.listen(process.env.PORT);