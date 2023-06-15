import {React,useState,useEffect} from 'react'
import "./profile.css"
import Topbar from '../../components/topbar/Topbar'
import RightBar from '../../components/rightbar/rightbar'
import Sidebar from '../../components/sidebar/sidebar'
import Feed from '../../components/feed/Feed'
import axios from 'axios'
import { useParams } from "react-router";


export default function Profile(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser]=useState();
    const username = useParams().username;
    useEffect(() => {
        const fetchUser = async()=>{
        const res = await axios.get(`http://localhost:8800/api/user?username=${username}`);
        setUser(res.data)
    }  
    fetchUser();    
},[username]);


    return(
        <>
        {
            user&&//mientras user tenga algo
            <>
            <Topbar/>
            <div className="profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover"> 
                        <img className='profileCoverImg' src={user.profilePicture} alt="" />
                        <img className='profileUserImg' src={user.coverPicture} alt="" />
                    </div>
                    <div className='profileInfo'>
                        <h4 className='profileInfoName'>{user.username}</h4>
                        <span className='profileInfoDesc'>{user.desc}</span>
                    </div>
                    </div>
                    <div className="profileRightBottom">
                    <Feed userId={user._id} username={username}/>
                    <RightBar user={user}/> 
                    </div>  
            </div>
            </div>
            </div>
            </>
        }
    
    </>
    )
}