import express from "express";
const router = express.Router();
export default router;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { registerUser, loginUser } from "#db/queries/users";


//verifyToken does not link to the user.id and passwords do not hash when being saved
export const verifyToken = (req, res, next) => {
    if (!req.headers[`authorization`]){return res.status(401).send(`No token provided.`)};
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
};




//POST /users/register
router.route("/register").post(async(req,res)=>{
    const {username, password} = req.body;

    try{
        const hashedpassword = await bcrypt.hash(password, 5);

        const newUser = await registerUser({username, password:hashedpassword});


        if (!newUser){
            return res.status(400).send(`New user could not be registered`)
        };

        const token = jwt.sign({id: newUser.id, username: newUser.username}, process.env.JWT_SECRET);

        res.status(201).json(token);

    }catch(err){
        console.log(err);
        res.send(`There was an error registering the user.`)
    };

});


//POST /users/login
router.route("/login").post(async(req,res)=>{
    const {username, password} = req.body;

    try{
        const userInfo = await loginUser({username});
        console.log(userInfo);
       
        const passwordMatch = await bcrypt.compare(password, userInfo.password);

        if (!passwordMatch){
            return res.status(401).send(`Not authorized.`);
        };

        const token = jwt.sign({id: userInfo.id, username: userInfo.username}, process.env.JWT_SECRET);

        res.status(201).send(token);
        
    } catch (err){
        console.log(`Unable to login.`)
    };
});