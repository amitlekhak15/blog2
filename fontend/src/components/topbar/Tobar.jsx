import React, { useContext } from 'react'
import "./topbar.css"
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

const Tobar = () => {
    const {user,dispatch}=useContext(Context)

    const handellogout=async()=>{
        dispatch({type:"LOGOUT"})


    }
  return (
    <div className="top">
        <div className="topleft">
            <Link to="https://github.com/amitlekhak15"> <i className="topicon fab fa-github"aria-hidden="true" ></i></Link> 
            <Link to="https://www.linkedin.com/in/amit-lekhak-380919162/"> <i className=" topicon fab fa-linkedin"></i></Link>
            <i className="topicon fab  fa-pinterest-square"></i>
            <i className="topicon fab fa-instagram-square"></i>
        </div>
        <div className="topcenter">
            <ul className='toplist'>
                <li className='toplistitem'>
                    <Link to="/" style={{textDecoration:"none", color:'inherit'}}> Home</Link>
                </li>
                <li className='toplistitem'>
                <Link to="/about" style={{textDecoration:"none", color:'inherit'}}> About</Link>
                </li>
                <li className='toplistitem'>
                <Link to="/contact" style={{textDecoration:"none", color:'inherit'}}> Contact</Link>
                </li>
                <li className='toplistitem'>
                <Link to="/write" style={{textDecoration:"none", color:'inherit'}}> Write</Link>
                </li>
                <li className='toplistitem' onClick={handellogout}>
                    {user&&"logout"}</li>
            </ul>
        </div>
        <div className="topright">
            {
                user?(
                    <Link to="/settings"> <img className='topimage'
                    src={user.profilePic} alt={user.username} ></img></Link>
                
                ):
                (
                    <ul className='toplist'>
                    <li className='toplistitem'>
                    <Link to="/login" style={{textDecoration:"none", color:'inherit'}}> Login</Link>
                    </li>
                    <li className='toplistitem'>
                    <Link to="/register" style={{textDecoration:"none", color:'inherit'}}> Register</Link>
                    </li>

                    </ul>
                )
            }
            
            <i className=" topsearchicon fas fa-search"></i>
        </div>

    </div>
    
  )
}

export default Tobar