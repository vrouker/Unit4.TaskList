import express from "express";
const router = express.Router();
export default router;

import { createTask, getALLTasks, getTaskById, updateTask, deleteTask } from "#db/queries/tasks";
import { verifyToken } from "./users.js";



//POST /tasks
router.route("/").post(async(req,res)=>{
    if (!req.body){
        return res.status(400).send({error: `Missing req.body`})
    };

    const {title, done} = req.body;

    if (!title || !done){
        return res.status(400).send({error: `Missing required fields.`});
    };

    const task = await createTask({title, done});

    res.status(201).send(task);
});



//GET /tasks
router.route("/", verifyToken).get(async(req,res)=>{
    const tasks = await getALLTasks();
    res.send(tasks);
});


//PUT /tasks/:id
router.route("/:id").post(async(req,res)=>{
    const id = req.params.id;

    if(!req.body){
        return res.status(400).send({error: `Missing req.body`})
    };

    const {title, done} = req.body;

    if(!title || !done){
        return res.status(400).send({error: `Missing required fields.`})
    };

    const task = await updateTask(id);

    const updatedTask = await updateTask({id, title, done});

    res.send({updatedTask});
});


//DELETE /tasks/:id
router.route("/:id").delete(async(req,res)=>{
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