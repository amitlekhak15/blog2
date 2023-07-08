import React, { useContext, useRef } from 'react'
import "./login.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../context/Context'

const Login = () => {
  const userref=useRef()
  const passwordref=useRef()
  const{user,dispatch,isFetching}=useContext(Context)
 const  handleSubmit=async(e)=>{
  e.preventDefault()
  dispatch({type:"LOGIN START"})
  try{
    const res=await axios.post(`/api/auth/login`,{
      username:userref.current.value,
      password:passwordref.current.value
    })
    dispatch({type:"LOGIN_SUCCESS",payload:res.data})

  }catch(err){
    dispatch({type:"LOGIN_FAILURE"})


  }
 
 }
 console.log(user)
  return (
    <div className="login">
        <span className='logintitle'> Login</span>
        <form className="loginform"  onSubmit={handleSubmit}>
            <label >Username</label>
            <input type="text" className='logininput' placeholder='enter your username' ref={userref}/>
            <label>Password</label>
            <input type='password' placeholder='enter your password' className='logininput' ref={passwordref}/>
            <button className="loginbutton">Login</button>
            <button className="loginregisterbutton" type='submit' disabled={isFetching}>
                <Link to="/register" style={{textDecoration:"none",color:"inherit"}}> Register</Link>
            </button>
            </form>
            
           
            
            
        
        </div>
  )
}

export default Login