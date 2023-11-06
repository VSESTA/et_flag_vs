const db = require('../db/db');

async function getAllStatuses(){
    const sql = `SELECT id, name, is_active FROM status WHERE is_active = 1`;
    const [result, ...info] = await db.execute(sql);
    return result;
}

async function getStatusById(id){
    const sql = `SELECT id, name, is_active FROM status WHERE id= ${id}`;
    const [result, ...info] = await db.execute(sql);
    return result[0];
}



module.exports={
    getAllStatuses,
    getStatusById
}