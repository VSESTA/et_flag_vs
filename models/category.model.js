const db = require('../db/db');
const { getCurrentDate } = require('../utils/dates.utils');

async function getAllCategories(showInactive){
    let sql;
    if(showInactive){
         sql = `SELECT id, name, description, is_active FROM category`;
    }else{
         sql = `SELECT id, name, description, is_active FROM category WHERE is_active=1`;
    }
    const [result, ...info] = await db.execute(sql);
    return result;
}

async function getCategoryById(id){
    const sql = `SELECT id, name, description, is_active, created_at, updated_at FROM category WHERE id= ${id}`;
    const [result, ...info] = await db.execute(sql);
    return result[0];
}

async function createCategory(category){
    const sql = `INSERT INTO category(name, description, is_active, created_at)
                VALUES("${category.name}",
                 "${category.description}",
                 "${category.is_active}",
                 "${getCurrentDate()}")`;

    const [newCategory,...info] = await db.execute(sql);
    return newCategory.insertId;
}

async function updateCategoryById(id,category){

    const sql=`UPDATE category
                SET name = "${category.name}",
                description = "${category.description}",
                is_active = "${category.is_active}",
                updated_at = "${getCurrentDate()}"
                WHERE id = ${id} `;
    const result = db.execute(sql); 
    return result;
}


module.exports={
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    createCategory
}