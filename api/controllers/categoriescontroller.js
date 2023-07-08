import express from"express"
import User from "../models/User.js"
import Post from"../models/Post.js"
import Category from"../models/Category.js"
export const createcategorycontroller=async(req,res)=>{
    const newcat=new Category(req.body);
    try{
        const savecat=await newcat.save()
        res.status(200).json(savecat)

    }catch(err){
        res.status(500).json(err)
    }
}
export const getcategorycontroller=async(req,res)=>{
    
    try{
        const cats=await Category.find({});
        res.status(200).json(cats)

    }catch(err){
        res.status(500).json(err)
    }
}