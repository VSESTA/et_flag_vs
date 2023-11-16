const db = require('../db/db');
const {getCurrentDate} = require('../utils/dates.utils');

async function getAllUsers(showInactive){
    let sql;
    if(showInactive){
         sql=`SELECT id, name, email,is_admin, is_active, created_at, updated_at FROM user`;
    }else{
         sql=`SELECT id, name, email,is_admin, is_active, created_at, updated_at FROM user WHERE is_active = 1`;
    }
    const [result, ...info] = await db.execute(sql);
    return result;
}

async function getUserById(id){
    const sql=`SELECT * FROM user WHERE id = ${id}`;
    const [result, ...info] = await db.execute(sql);
    return result[0];
};

async function getUserByEmail(email){
    const sql=`SELECT * FROM user WHERE email = "${email}"`;
    const [result, ...info] = await db.execute(sql);
    return result[0];
};

async function checkExistingUserByEmail(email){
    const sql=`SELECT COUNT(*) numberOfUsers FROM user WHERE email = "${email}"`;
    const [count, ...info] = await db.execute(sql);
    return count[0].numberOfUsers > 0;
};

async function createUser(user){
    let sql = `INSERT INTO user(name, email, password, is_active)
    VALUES(
        "${user.name}",
        "${user.email}",
        "${user.password}",
        "1"
    )`;

    const [result, ...info] = await db.execute(sql);
    return result;
};

async function updateUser(id, user){
    let sql = `UPDATE user 
                SET name = "${user.name}",
                email = "${user.email}", 
                is_active = "1", 
                updated_at = "${getCurrentDate()}"
                WHERE id = ${id}`;

    const result = db.execute(sql); 
    return result;
};

async function updateUserPassword(id, password){
    let sql = `UPDATE user 
    SET password = "${password}",
    updated_at = "${getCurrentDate()}"
    WHERE id = ${id}`;

const result = db.execute(sql); 
return result;
};

async function toggleUserStatus(id, status){
    let sql = `UPDATE user
    SET is_active = ${status},
    updated_at = "${getCurrentDate()}"
    WHERE id = ${id}`;
    const result = db.execute(sql); 
    return result;
}

async function toggleUserAdmin(id, admin){
    let sql = `UPDATE user
    SET is_admin = ${admin},
    updated_at = "${getCurrentDate()}"
    WHERE id = ${id}`;
    const result = db.execute(sql); 
    return result;
}

module.exports = {
    createUser, 
    checkExistingUserByEmail,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    updateUserPassword,
    toggleUserStatus,
    toggleUserAdmin
}