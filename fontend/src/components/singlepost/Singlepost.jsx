import React, { useEffect, useState } from 'react'
import './singlepost.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import {Link} from "react-router-dom"
import { useContext } from 'react'
import { Context } from '../../context/Context'
const Singlepost = () => {
  const pf="http://localhost:8080/images/"
  const location=useLocation()
  const path=location.pathname.split("/")[2]
  const[post,setpost]=useState({})
  const{user}=useContext(Context)
  const[title,settitle]=useState("")
  const[desc,setdesc]=useState("")
  const[updatemode,setupdatemode]=useState(false)
  useEffect(() => {
    const getpost=async()=>{
      const res=await axios.get(`/api/post/${path}`)
      setpost(res.data)
      settitle(res.data.title)
      setdesc(res.data.desc)
    }
    getpost()
    
  }, [path]) 
  //delete
  const handledelete=async()=>{
    try{
      await axios.delete(`/api/post/${path}`,{
      data:{username:user.username}})
      window.location.replace("/")
      
    }catch(err){

    }
    

  }
  //handleupdate
  const handleupdate=async()=>{
    try{
      await axios.put(`/api/post/${path}`,{
      username:user.username,title,desc
    })
    setupdatemode(false)
      window.location.reload()
      
    }catch(err){

    }
 
  }
  
  return (
    <div className="singlepost">
        <div className="singlepostwrapper">
          {post.photo&&(
            <img src={pf+post.photo} alt={post.title} className="singlepostimage" />
            )}
            {
              updatemode?<input type="text" value={title}className=' singlepostitleinput'autoFocus onChange={(e)=>settitle(e.target.value)}/>:(

             
        <h1 className="singlepostitle"> {post.title}
        {post.username===user.username&&(
        <div className="singlepostedit">
        <i className=' singleposticon far fa-edit' onClick={()=>{setupdatemode(true)}}></i>
            <i className=' singleposticon  far fa-trash-alt' onClick={handledelete}></i>
        </div>
        )}
        </h1>
         )
        }
        <div className="singlepostinfo">

            <span className='singlepostauthor'>Author:
            <Link to={`/?user=${post.username}`} className="link">
            <b>{post.username}</b>
            </Link>
            </span>
            <span className='singlepostdate'>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updatemode?<textarea className="singlepostdescriptioninput" value={desc} autoFocus onChange={(e)=>setdesc(e.target.value)}/>
        
        :(
      <p className="singlepostdescription">
          {post.desc}
        </p>
        )}
        {updatemode&&<button className='singlepostbutton' onClick={handleupdate}>Update</button>}
        </div>
</div>
  )
}  

export default Singlepost