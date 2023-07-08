import express from"express"
import User from "../models/User.js"
import Post from"../models/Post.js"

export const createpostcontroller=async(req,res)=>{
    const newpost=new Post(req.body)
    try{
        const savedpost= await newpost.save()
        return res.status(200).json(savedpost)

    }catch(err){
        res.status(500).json(err)

    }
}
export const updatepostcontroller=async(req,res)=>{
     
    try{
        const post =await Post.findById(req.params.id)
        if(post.username==req.body.username){
            try{
               const updatedpost=await Post.findByIdAndUpdate(req.params.id,{
                $set:req.body
               }, {new:true})
               res.status(200).json(updatedpost)
            }catch(err){
                res.status(500).json(err)
    
            }
            

        }else{
            res.status(401).send("you cannot update others post its not your post ")
        }
        
        
        }
        catch(err){
        res.status(500).json(err)

    }
    

}
export const deletepostcontroller=async(req,res)=>{
    try{
        const post =await Post.findById(req.params.id)
        if(post.username==req.body.username){
            try{
               await post.deleteOne()
               res.status(200).json("post deleted ")
            }catch(err){
                res.status(500).json(err)
    
            }
            

        }else{
            res.status(401).send("you cannot delete others post its not your post ")
        }
        
        
        }
        catch(err){
        res.status(500).json(err)

    }
    
}
export const getpost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
       
        res.status(200).json(post)

    }catch(err){
        res.status(500).json(err)

    }

}
///get all post
export const getallpost=async(req,res)=>{
    const username=req.query.user
    const catname=req.query.cat
    try{
        let posts
        if(username){
            posts=await Post.find({username})
        }else if(catname){
            posts=await Post.find({categories:{
                $in:{catname}
            }})


        }
        else{
             posts=await Post.find({})

        }
        
       
        res.status(200).json(posts)

    }catch(err){
        res.status(500).json(err)

    }

}