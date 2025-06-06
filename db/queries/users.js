import db from "#db/client";


//returns the created user according to the given details
export async function createUser({username, password}){
    const sql = `
        INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;
    `;

    const {rows: user} = await db.query(sql, [username, password]);

    return user[0];
};

