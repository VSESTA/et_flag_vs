const db = require('../db/db');

async function getUserById(id){
    const sql=`SELECT * FROM user WHERE id = ${id}`;
    const [result, ...info] = await db.execute(sql);
    return result[0];
};

async function getUserByEmail(email){
    const sql=`SELECT * FROM user WHERE email = ${email}`;
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

async function updateUser(id, user){};

async function updateUserStatus(id, user){};

async function login(username, password){};

async function logout(userid){};

module.exports = {
    createUser, 
    checkExistingUserByEmail,
    getUserById,
    getUserByEmail
}