const db = require('../db/db');

async function getAllCategories(){
    const sql = `SELECT id, name, description, is_active FROM category`;
    const [result, ...info] = await db.execute(sql);
    return result;
}

async function getCategoryById(id){
    const sql = `SELECT id, name, description, is_active FROM category WHERE id= ${id}`;
    const [result, ...info] = await db.execute(sql);
    return result[0];
}



module.exports={
    getAllCategories,
    getCategoryById
}