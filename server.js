const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mysql = require('mysql');

const expenseRouter = require('./routes/expense.router');

//inicializar ficheiro .env
dotenv.config();

//criar a conexão à BD

const db = mysql.createConnection({
    host :      process.env.DB_HOST,
    database :  process.env.DB_NAME,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASSWORD
    
});

db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('connected!')
})

//criar servidor com express
const app = express();

//criar middleware para logar informação dos requests
app.use(morgan('combined'));
//criar middleware para devolver respostas json
app.use(express.json());

//usar as rotas
app.use('/expenses',expenseRouter);

app.listen(process.env.PORT || 3000);