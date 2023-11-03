const db = require('../db/db');
const {getCurrentDate} = require('../utils/dates.utils')

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
                password = "${user.password}", 
                is_active = "1", 
                updated_at = ${getCurrentDate()}
                WHERE id = ${id}`;

    const [result, ...info] = db.execute(sql); 
    return result;
};

async function updateUserStatus(id, user){};

module.exports = {
    createUser, 
    checkExistingUserByEmail,
    getUserById,
    getUserByEmail,
    updateUser
}