const db = require('../db/db');

async function getUserById(id){
    const sql=`SELECT * FROM user WHERE id = ${id}`;
    const [result, ...info] = await db.execute(sql);
    return result;
};

async function getUserByEmail(email){
    const sql=`SELECT * FROM user WHERE email = "${email}"`;
    const [user, ...info] = await db.execute(sql);
    return user;
};

async function createUser(user){
    let sql = `INSERT INTO user(name, email, password, is_active, created_at)
    VALUES(
        "${user.name}",
        "${user.email}",
        "${user.password}",
        true,
        ${Date.now}
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
    getUserByEmail
}