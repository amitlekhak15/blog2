import React, { useState,useEffect} from 'react'
import "./home.css"
import Header from "../../components/header/Header"
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from "axios"
import { useLocation } from 'react-router-dom'

const Home = () => {
  const[posts,setposts]=useState([])
  const {search} =  useLocation()
  useEffect(() => {
    const fetchpost=async()=>{
     const res= await axios.get("/api/post" +search)
     setposts(res.data)
    }
    fetchpost()
  }, [search])
  
  return (
    <>

    <Header/>
    <div className='home'>
        <Posts posts={posts}/>
        <Sidebar/>
    </div>
    
    </>
  )
}

export default Home