import db from "#db/client";


//returns the created movie according to details provided
export async function createTask({title, done, user_id}){
    const sql = `
        INSERT INTO tasks (title, done, user_id) VALUES ($1, $2, $3) RETURNING *;
    `;

    const {rows: task} = await db.query(sql, [title, done, user_id]);

    return task[0];
};




//getALLTasks
export async function getALLTasks(){
    const sql =  `
        SELECT * from tasks;
    `;

    const {rows: tasks} = await db.query(sql);

    return tasks;
};



//getTaskById
export async function getTaskById (id){
    const sql = `
    SELECT * FROM tasks WHERE id = $1;
    `;

    const {rows: task} = await db.query(sql, [id]);

    return task;
};



//updateTask
export async function updateTask ({id, title, done, user_id}){
    const sql = `
        UPDATE tasks SET title =$1, done = $2, user_id=$3 WHERE id = $4 RETURNING *;
    `;

    const {rows: task} = await db.query(sql, [title, done, user_id, id]);

    return task;
};



//deleteTask
export async function deleteTask (id){
    const sql = `
        DELETE FROM tasks WHERE id = $1 RETURNING *;
    `;

    const {rows} = await db.query (sql, [id]);

    return rows;
};