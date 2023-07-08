import React from 'react'
import "./post.css"
import {Link} from"react-router-dom"

const Post = ({post}) => {
  const pf="http://localhost:8080/images/"
  return (
    <div className='post'>
      {post.photo &&(
    <img  className='postimage'
    src={pf+post.photo} alt="tech"></img>)}
    <div className="postinfo">
        <div className='postcats'>
            {post.categories.map(c=>(
              <span className='postcat'>{c.name}</span>
            ))}
            </div>
            <Link to ={`/post/${post._id}`} className='link'>
            <span className='posttitle'>
        {post.title}
        </span>

            </Link>
        
        <hr/>
        <span className="postdate">{new Date(post.createdAt).toDateString()}</span>
 </div>
 <p  className='postdescription'>
{post.desc}
</p>
   
    </div>
  )
}

export default Post