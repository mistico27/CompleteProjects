import {React,useState,useEffect} from 'react'
import './feed.css'
import Share from '../share/share'
import Post from '../post/post'
import axios from 'axios'

export default function Feed(){
    const [posts,setPosts]=useState([]);
   
    useEffect(() => {
            const fetchPosts = async()=>{
                const res= await axios.get("posts/timeline/6477d2696513adc015525f7a")
                setPosts(res.data)
            }   
            fetchPosts();    
      },[]);
    
      
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