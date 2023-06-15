import React, { useEffect, useState } from 'react'
import  './rightbar.css'
import {Users} from '../../dummyData'
import Online from '../online/online'
import axios from 'axios'

export default function Rightbar({user}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends,setFriends] =useState([]);
    
    useEffect(()=>{
        const getFriends = async()=>{
            try{
                const friendList = await axios.get("http://localhost:8800/api/user/friends/"+user._id);
                console.log(friendList.data);
                setFriends(friendList.data);
            }catch(e){
                console.log(e);
            }
        };
        getFriends();
    },[user])


    const HomeRightbar =()=>{
        return(
            <>
            <div className="birthdayContainer">
                    <img className='birthdayImage' src="/assets/paisajes/images2.jpg" alt="" />
                    <span className='birthdayText'><b>Paula Foster</b> is visiting nevada montains...</span>
                </div>
                <img className='rightbarAdd' src="/assets/paisajes/download.jpg" alt="" />
                <h4 className='rightbartTitle'>Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u)=>(
                        <Online key={u.id} user={u}/>
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightbar=()=>{
        return(
            <>
                <h4 className='rightbarTitle'>User Information</h4>
                
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">
                            City:
                        </span>
                        <span className="rightbarInfoValue">
                            {!user.city?"Ontario":user.city}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">
                            From:
                        </span>
                        <span className="rightbarInfoValue">
                        {!user.from?"Madrid":user.from}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">
                            Relationship:
                        </span>
                        <span className="rightbarInfoValue">
                           {user.relationship===1 ? "Single":user.relationship===2?"Married":"in hope to find someone"}
                        </span>
                    </div>
                </div>
                <h4 className='rightbarTitle'>User Friends</h4>
                <div className="rightbarFollowings">
                    {friends.map(friend=>{
                        console.log("ïmage", PF+friend.profilePicture)
                            return <div className="rightbarFollowing">
                            <img className='rightbarFollowingImg' src={friend.profilePicture ? PF+friend.profilePicture:PF+"caro.jpg"} alt="" />
                            <span className="rightbarFollowingName">{friend.username}</span>
                        </div> 
                    })}
                        
                </div>
            </>
        )
    }
   
return(
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {user ?<ProfileRightbar/>:<HomeRightbar/>}
            </div>
        </div>
    )
}