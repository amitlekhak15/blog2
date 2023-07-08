import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authrouter from "./routes/auth.js"
import userrouter from "./routes/users.js"
import postrouter from "./routes/posts.js"
import categoryrouter from "./routes/categories.js"
import morgan from "morgan"
import multer from "multer"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app=express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)


dotenv.config()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
const PORT=process.env.PORT||8080
const mongoserver=async()=>{
   await  mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Databse connected")).catch((err)=>console.log(err))

}
mongoserver()
app.use("/images",express.static(path.join(__dirname,"images")))
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }

})
const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")
})
app.get("/",(req,res)=>{
    res.send("everything working fine")
})
app.use(express.static(path.join(__dirname,"../fontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../fontend/build/index.html"))
})

//


app.use("/api/auth",authrouter)
app.use("/api/user",userrouter)
app.use("/api/post",postrouter)
app.use("/api/category",categoryrouter)
app.listen(PORT,()=>{
    console.log(`server started ${PORT}`)
})