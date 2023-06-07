import {React,useState,useEffect} from 'react'
import './post.css'
import {MoreVert} from "@mui/icons-material"
import axios from 'axios'
import {format} from 'timeago.js'

export default function Post({post}){
    const [like, setLike] = useState(post.likes.length);
    const [isLiked,setIsLiked]=useState(false);
    const [user,setUser]=useState({});

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    useEffect(() => {
        const fetchUser = async()=>{
            const res= await axios.get(`user/${post.userId}`)
            setUser(res.data)
           
        }   
        fetchUser();    
    },[post.userId]);
    

    const likeHandler =()=>{
        setLike(isLiked ? like-1:like+1)
        setIsLiked(!isLiked)
    }
    /*
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
*/
return(
        <div className='post'>
           <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className='postProfileImage' src={user.profilePicture ||PF+"IMG_20230315_193516.jpg" } alt="" />
                    <span className='postUserName'>
                    {user.username}
                    </span>
                    <span className='postDate'>fecha</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className='postImg' src={post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className='likeIcon' src="/assets/emoticons/like.png" onClick={likeHandler} alt="" />
                    <img className='likeIcon' src="/assets/emoticons/megusta.png" onClick={likeHandler}  alt="" />
                    <span className="postLikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight"></div>
                <span className="postCommentText">{post.comment} comments</span>
            </div>
           </div>
        </div>
    );

    
}