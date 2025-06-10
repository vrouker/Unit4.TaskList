import express from "express";
const router = express.Router();
export default router;

import { createTask, getALLTasks, getTaskById, updateTask, deleteTask } from "#db/queries/tasks";
import { verifyToken } from "./users.js";




//POST /tasks
router.route("/").post(verifyToken, async(req,res)=>{
    if (!verifyToken){
        return res.status(403).send(`Please log in to access the tasks.`)
    }
    if (!req.body){
        return res.status(400).send({error: `Missing req.body`})
    };

    const {title, done, user_id} = req.body;

    if (!title || !done){
        return res.status(400).send({error: `Missing required fields.`});
    };

    const task = await createTask({title, done, user_id});

    res.status(201).send(task);
});



//GET /tasks
router.route("/").get(verifyToken, async(req,res)=>{
    if(!verifyToken){
        return res.status(400).send(`Not authorized.`)
    }
    const tasks = await getALLTasks();
    res.send(tasks);
});


//PUT /tasks/:id
router.route("/:id").post( verifyToken, async(req,res)=>{
    if (!verifyToken){
        return res.status(403).send(`Please log in to access the tasks.`)
    }

    const id = req.params.id;

    if(!req.body){
        return res.status(400).send({error: `Missing req.body`})
    };

    const {title, done, user_id} = req.body;

    if(!title || !done || !user_id){
        return res.status(400).send({error: `Missing required fields.`})
    };

    const task = await updateTask(id);

    const updatedTask = await updateTask({id, title, done, user_id});

    res.send({updatedTask});
});


//DELETE /tasks/:id
router.route("/:id").delete( verifyToken, async(req,res)=>{
    if (!verifyToken){
        return res.status(403).send(`Please log in to access the tasks.`)
    }
    
    const id = req.params.id;

    if (!Number.isInteger(id) && id <0){
        return res.send(400).send({error: `Please use a valid number for the task ID.`})
    }


    const deletedTask = await deleteTask(id);

    if(!deletedTask){
        return res.status(404).send({error: `Task ID not found`})
    };

    res.sendStatus(204);
})