import {React,useState,useEffect} from 'react'
import './feed.css'
import Share from '../share/share'
import Post from '../post/post'
import axios from 'axios'

export default function Feed({username, userId}){
    const [posts,setPosts]=useState([]);
   
    useEffect(() => {
            const fetchPosts = async()=>{
                const res= username
                ? await axios.get("http://localhost:8800/api/posts/profile/"+username)
                : await axios.get("posts/timeline/6477d981553e27cd071d15a7")
                setPosts(res.data)
            }   
            fetchPosts();    
      },[username]);
    
      
return(
        <div className='feed'>
            <div className="feedWrapper">
                <Share/>
                {posts.map((p)=>(
                <Post key={p._id} post={p}/>
                ))}     
             </div>
        </div>
    )

}