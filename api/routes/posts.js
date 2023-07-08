import express from "express"
import { deletepostcontroller, getpost, updatepostcontroller,createpostcontroller, getallpost } from "../controllers/postcontroller.js"
const postrouter=express.Router()


//userrocreate
postrouter.post("/", createpostcontroller)
//updatepost
postrouter.put("/:id",updatepostcontroller)
//delete
postrouter.delete("/:id",deletepostcontroller)
postrouter.get("/:id",getpost)
postrouter.get("/" ,getallpost)
export default postrouter