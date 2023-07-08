import React,{useEffect,useState}from 'react'
import "./sidebar.css"
import axios from 'axios'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const[cats,setcat]=useState([])
    useEffect(() => {
      const setcats=async ()=>{
        const res=await axios.get(`/api/category`)
        setcat(res.data)

      }
      setcats()
    }, [])
    
  return (
    <div className='sidebar'>
        <div className="sidebaritem">
            <span className='sidebartitle'>ABOUT ME</span>
            <img className="image"src="https://media.licdn.com/dms/image/C4E03AQGKl4v2S6GZBQ/profile-displayphoto-shrink_800_800/0/1611156304201?e=1694044800&v=beta&t=ra7gt_qoYgooOp1JnGlEyck8JItVJ96UHhs8nZ9lF7U" alt=""></img>
            <p>Amit Lekhak</p>
            <p>Engineering student with a passion for problem-solving and a love for coding. Creative problem solver with a passion for technology and innovation. I'm always looking to learn and grow my skillset as a full stack engineer.</p>
        
        </div>
        <div className='sidebaritem'>
            <span className='sidebartitle'>Categories</span>
            <ul className='sidebarlist'> 
            {cats.map(c=>(
                <Link to={`/?cat=${c.name}`}className="link  sidebarlistitem" > <li className='sidebarlistitem'>{c.name}</li></Link>
                

            ))}
            
            
            </ul>

        </div>
        <div className='sidebaritem'>
            <span className='sidebartitle'>Follow on</span>
            <div className='sidebarsocial'> 
            <Link to="https://github.com/amitlekhak15"> <i className="sidebaricon fab fa-github"aria-hidden="true" ></i></Link> 
            <Link to="https://www.linkedin.com/in/amit-lekhak-380919162/"> <i className=" sidebaricon fab fa-linkedin"></i></Link>
            <i className="sidebaricon fab  fa-pinterest-square"></i>
            <i className="sidebarficon fab fa-instagram-square"></i>
            </div>

        </div>
        </div>
  )
}

export default Sidebar
 