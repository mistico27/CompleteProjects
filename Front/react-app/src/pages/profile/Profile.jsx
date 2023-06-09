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
    const [user,setUser]=useState([]);
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
    <Topbar/>
        <div className="profile">
        <Sidebar/>
        <div className="profileRight">
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover"> 
                    <img className='profileCoverImg' src={`${PF}/paisajes/download.jpg`} alt="" />
                    <img className='profileUserImg' src={`${PF}cherry.jpg`} alt="" />
                </div>
                <div className='profileInfo'>
                    <h4 className='profileInfoName'>{user.username}</h4>
                    <span className='profileInfoDesc'>{user.desc}</span>
                </div>
                </div>
                <div className="profileRightBottom">
                <Feed userId={user._id} username="Marcos"/>
                <RightBar user/> 
                </div>  
        </div>
        </div>
        </div>
    </>
    )
}