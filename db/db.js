//const mysql = require('mysql');
const mysql = require('mysql2');
const dotenv = require('dotenv');

//inicializar ficheiro .env
dotenv.config();

//criar a conexão à BD

const db = mysql.createPool({
    host :      process.env.DB_HOST,
    database :  process.env.DB_NAME,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASSWORD
    
});



module.exports = db.promise();
