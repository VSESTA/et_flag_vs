const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const db = require('./db/db');

const expenseRouter = require('./routes/expense.router');

//inicializar ficheiro .env
dotenv.config();

//criar conexao bd
db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('connected!')
});

//criar servidor com express
const app = express();

//criar middleware para logar informação dos requests
app.use(morgan('combined'));
//criar middleware para devolver respostas json
app.use(express.json());

//usar as rotas
app.use('/expenses',expenseRouter);

app.listen(process.env.PORT || 3000);