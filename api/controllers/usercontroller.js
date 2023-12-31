import express from"express"
import bcrypt from "bcrypt"
import User from "../models/User.js"
import Post from"../models/Post.js"
const saltRounds=10
export const updatecontroller=async(req,res)=>{
    if(req.body.userid===req.params.id){
        if(req.body.password){
            //const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hash(req.body.password, saltRounds);
        }

    
    try{
        const updateduser =await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true})
        res.status(200).json(updateduser)
        
        }
        catch(err){
        res.status(500).json(err)

    }}
    else{
        res.status(401).json("you can only update your account")
    }

}
export const deletecontroller=async(req,res)=>{
    if(req.body.userid===req.params.id){
        try{
            const user=await User.findById(req.params.id)
            try{
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json(("User has been delted"))
                 
                 }
                 catch(err){
                 res.status(500).json(err)
         
             }



        }catch(err){
            res.json(404).json("user not found")
        }
    }
    
    
    else{
        res.status(401).json("you can only delete your account")
    }

}
export const getuser=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...others}=user._doc
        res.status(200).json(user)

    }catch(err){
        res.status(500).json(err)

    }

}