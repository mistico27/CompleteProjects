import React from 'react'
import './post.css'
import {MoreVert} from "@mui/icons-material"
import {Users} from '../../dummyData'

export default function Post({post}){
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
                    <img className='likeIcon' src="/assets/emoticons/like.png" alt="" />
                    <img className='likeIcon' src="/assets/emoticons/megusta.png" alt="" />
                    <span className="postLikeCounter">{post.like} </span>
                </div>
                <div className="postBottomRight"></div>
                <span className="postCommentText">{post.comment} comments</span>
            </div>
           </div>
        </div>
    );

    
}