import React from 'react'
import './post.css'
import {MoreVert} from "@mui/icons-material"
import {Users} from '../../dummyData'
import {useState} from 'react'

export default function Post({post}){
    const [like,setLike]=useState(post.like);
    const [isLiked,setIsLiked]=useState(false);

    const likeHandler =()=>{
        setLike(isLiked ? like-1:like+1)
        setIsLiked(!isLiked)
    }
    const getName=()=>{
        for(let i=0; i<Users.length; i++){
            if(post.userId===Users[i].id){
                   return Users[i].username; 
            }
        }
    }
    
    ///get profilePhoto
    const getProfilePicture=()=>{
        for(let i=0; i<Users.length; i++){
            if(post.userId===Users[i].id){
                   return Users[i].profilePicture; 
            }
        }
    }

return(
        <div className='post'>
           <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className='postProfileImage' src={getProfilePicture()} alt="" />
                    <span className='postUserName'>
                    {getName()}
                    </span>
                    <span className='postDate'>{post.date}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className='postImg' src={post.photo} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className='likeIcon' src="/assets/emoticons/like.png" onClick={likeHandler} alt="" />
                    <img className='likeIcon' src="/assets/emoticons/megusta.png" onClick={likeHandler}  alt="" />
                    <span className="postLikeCounter">{like} </span>
                </div>
                <div className="postBottomRight"></div>
                <span className="postCommentText">{post.comment} comments</span>
            </div>
           </div>
        </div>
    );

    
}