import React from 'react'
import './post.css'
import {MoreVert} from "@mui/icons-material"
export default function Post(){
return(
        <div className='post'>
           <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className='postProfileImage' src="/assets/arely-reyes.jpg" alt="" />
                    <span className='postUserName'>Arely Reyes</span>
                    <span className='postDate'>5 min ago</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">Hey its my first post</span>
                <img className='postImg' src="/assets/paisajes/japon.png" alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className='likeIcon' src="/assets/emoticons/like.png" alt="" />
                    <img className='likeIcon' src="/assets/emoticons/megusta.png" alt="" />
                    <span className="postLikeCounter">32 people like it </span>
                </div>
                <div className="postBottomRight"></div>
                <span className="postCommentText">9 comments</span>
            </div>
           </div>
        </div>
    );

}