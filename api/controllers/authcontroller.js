import express from"express"
import bcrypt from "bcrypt"
import User from "../models/User.js"
const saltRounds=10
export const registercontroller=async(req,res)=>{
    try{
        const{username,email,password}=req.body
        const exist= await User.findOne({email})
        if(exist){
           return res.status(200).send({success:false,message:"user already exist",
            exist
        })
        }
        const hashed = await bcrypt.hash(password, saltRounds);
        const newuser= await new User({
           username,
           email,
           password:hashed
        }).save()
        
        return res.status(200).send({
            success:true,
            message:"successfully registerd",
            newuser
        })


    }catch(err){
        return res.status(500).send({success:false,
            message:"something went wrong",
            err})

    }

}
export const logincontroller=async(req,res)=>{
    try{
        
        const exist= await User.findOne({username:req.body.username})
        if(!exist){
           return res.status(400).json("user doesnot exist")
            
        
        }
        const hashed = await bcrypt.compare(req.body.password, exist.password);
        
        const{password, ...others}=exist._doc
        
        
        return res.status(200).json(others)


    }catch(err){
       return res.status(500).json(err)

    }

}