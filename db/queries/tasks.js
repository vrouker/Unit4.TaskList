import db from "#db/client";


//returns the created movie according to details provided
export async function createTask({title, done, user_id}){
    const sql = `
        INSERT INTO tasks (title, done, user_id) VALUES ($1, $2, $3) RETURNING *;
    `;

    const {rows: task} = await db.query(sql, [title, done, user_id]);

    return task[0];
};

