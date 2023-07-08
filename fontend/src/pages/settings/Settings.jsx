import React from 'react'
import "./settings.css"
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'



const Settings = () => {
  const pf="http://localhost:8080/images/"
  const{user,dispatch}=useContext(Context)
  const[file,setfile]=useState(null)
  const[username,setusername]=useState("")
  const[email,setemail]=useState("")
  const[password,setpassword]=useState("")
  const[success,setsuccess]=useState(false)

  const handelsubmit=async(e)=>{
      e.preventDefault()
      dispatch({type:"UPDATE_START"})
      const updateduser={
        userid:user._id,
        username,
        email,
        password

      }
      if(file){
        const data= new FormData()
        const filename=Date.now()+file.name
        data.append("name",filename)
        data.append("file",file)
        updateduser.profilePic=filename
        try{
          await axios.post("/api/upload",data)

        }catch(err){

        }
      }
      try{
        const res=await axios.put(`/api/user/${user._id}`,updateduser)
        setsuccess(true)
        dispatch({type:"UPDATE_SUCCESS",payload:res.data})
        console.log(axios)
        //window.location.replace("/post/"+ res.data._id)
      }catch(err){
        dispatch({type:"UPDATE_FAILURE"})

      }
    
  }
  const handledelete=async()=>{
    try{
      const res=await axios.delete(`/api/user/${user._id}`,{
        data:{userid:user._id}
      })
      if(res.data){
        window.location.replace("/register")
      }

    }catch(err){

    }
  }
  return (
    <div className='settings'>
    <div className="settingswrapper">
      <div className="settingstitle">
        <span className="settingsupdatetitle">
        Update your account
        </span>
        <span className="settingsdeletetitle" onSubmit={handledelete}>
          Delete your account
        </span>
      </div>
      <form  className="settingsform" onSubmit={handelsubmit}>
        <label>Profile Picture</label>
        <div className="settingspp">
          <img src={file ?URL.createObjectURL(file):pf+user.profilePic} alt="profilepic" onChange={(e)=>setfile(e.target.files[0])}></img>
          <label htmlFor='fileinput'>
            <i className=' settingsppicon far fa-user-circle'></i>
          </label>
          <input type="file" id="fileinput" style={{display:"none"}}/>
        </div>
        <label>Username</label>
        <input type="text" placeholder={user.username} onChange={(e)=>setusername(e.target.value)}/>
        <label>Email</label>
        <input type="email" placeholder={user.email} onChange={(e)=>setemail(e.target.value)}/>
        <label>Password</label>
        <input type="password" onChange={(e)=>setpassword(e.target.value)}/>
        <button className="settingssubmit" type="submit">Update</button>
        {success&&<span  style={{color:"blue"}}>Profile Updated succesfully</span>}
      </form>
</div>
<Sidebar/>
    </div>
  )
}

export default Settings