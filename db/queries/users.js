import db from "#db/client";


//registerUser
export async function registerUser({username, password}){
    const sql = `
        INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;
    `;

    const {rows: user} = await db.query(sql, [username, password]);

    return user[0];
};


//loginUser
export async function loginUser({username}){
    const sql = `SELECT * FROM users WHERE username = $1;`;

    const {rows: [user]} = await db.query(sql, [username]);

    return user;
};