import React, { useContext, useState } from 'react'
import "./write.css"
import { Context} from"../../context/Context"
import axios from "axios"

const Write = () => {
  const [title,settitle]=useState("")
  const [desc,setdesc]=useState("")
  const[file,setfile]=useState(null)
  const{user}=useContext(Context)
  const handelsubmit=async(e)=>{
      e.preventDefault()
      const newpost={
        username:user.username,
        title,
        desc,

      }
      if(file){
        const data= new FormData()
        const filename=Date.now()+file.name
        data.append("name",filename)
        data.append("file",file)
        newpost.photo=filename
        try{
          await axios.post("/api/upload",data)

        }catch(err){

        }
      }
      try{
        const res=await axios.post(`/api/post`,newpost)
        console.log(axios)
        window.location.replace("/post/"+ res.data._id)
      }catch(err){

      }
    
  }
  return (
    
    <div className='write'>
      {file&&( <img  className="writeimg" src={URL.createObjectURL(file)}alt="img"></img>)}
        
        <form className='writeform' onSubmit={handelsubmit}>
            <div className="writeformgroup">
                <label htmlFor='fileinput'>
                    <i className=" writeicon fas fa-plus"></i>
                     </label>
                <input type="file" id="fileinput" style={{display:"none"}}  onChange={(e)=>setfile(e.target.files[0])}></input>
                <input type="text" placeholder='Title' className='writeinput' autoFocus={true} value={title} onChange={(e)=>settitle(e.target.value)}></input>
            </div>
           <div className='writeformgroup'>
            <textarea name="" id="" cols="30" rows="10" placeholder='Tell your story' type="text" className='writeinput wrtetext' value={desc}
            onChange={(e)=>setdesc(e.target.value)}></textarea>
           </div>
           <button className="writesubmit" type="submit">Publish</button>

        </form>
    </div>
  )
}

export default Write