import express from "express"
const categoryrouter=express.Router()
import { createcategorycontroller, getcategorycontroller } from "../controllers/categoriescontroller.js";
categoryrouter.post("/",createcategorycontroller)
categoryrouter.get("/",getcategorycontroller)

export default categoryrouter;
