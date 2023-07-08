import express from "express"
const authrouter=express.Router()
import { logincontroller, registercontroller } from "../controllers/authcontroller.js"
//Register
authrouter.post("/register", registercontroller)
//Login
authrouter.post("/login",logincontroller)
export default authrouter