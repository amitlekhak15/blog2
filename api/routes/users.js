import express from "express"
import { deletecontroller, getuser, updatecontroller } from "../controllers/usercontroller.js"
const userrouter=express.Router()


//update
userrouter.put("/:id", updatecontroller)
//delete
userrouter.delete("/:id",deletecontroller)
userrouter.get("/:id",getuser)
export default userrouter