import React,{useState} from 'react'
import "./register.css"
import { Link } from 'react-router-dom'
import axios from 'axios'


const Register = () => {
  const[username,setusername]=useState("")
  const[email,setemail]=useState("")
  const[password,setpassword]=useState("")
  const[err,seterr]=useState(false)
  const handlesubmit=async(e)=>{
    e.preventDefault()
    seterr(false)
    try{
      const {data}=await axios.post(`/api/auth/register`,{
        username,email,password
      })
      data.success&&window.location.replace("/login")
    }catch(err){
seterr(err)
    }
  }
    
  return (
    <div className="register">
        <span className='registertitle'> Register</span>
        <form className="registerform" onSubmit={handlesubmit}>
        <label >Username</label>
            <input type="text"  value={username}className='registerinput' placeholder='enter your username' onChange={e=>setusername(e.target.value)}/>
            <label >Email</label>
            <input type="email" value={email} className='registerinput' 
            placeholder='enter your email' onChange={e=>setemail(e.target.value)} />
            <label>Password</label>
            <input type='password'  value={password} placeholder='enter your password' 
            className='registerinput'  onChange={e=>setpassword(e.target.value)} />
          
            <button className="registerbutton" type='submit'>Register</button>
            <button className="registe loginbutton">
            <Link to="/login" style={{textDecoration:"none",color:"inherit"}}>Login</Link>
           </button>
          {err&&<span> Something went wrong</span>}
            </form>
            
           
            
            
        
        </div>
  )
}

export default Register