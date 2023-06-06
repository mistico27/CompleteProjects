import React from 'react'
import  './rightbar.css'
import {Users} from '../../dummyData'
import Online from '../online/online'

export default function Rightbar({profile}){

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
                            New York
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">
                            From:
                        </span>
                        <span className="rightbarInfoValue">
                            Madrid
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">
                            Relationship:
                        </span>
                        <span className="rightbarInfoValue">
                           Single
                        </span>
                    </div>
                </div>
                <h4 className='rightbarTitle'>User Friends</h4>
                <div className="rightbarFollowings">
                        <div className="rightbarFollowing">
                            <img className='rightbarFollowingImg' src="/assets/bb.jpg" alt="" />
                            <span className="rightbarFollowingName">Bruni Sagnite</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img className='rightbarFollowingImg' src="/assets/bruni.jpg" alt="" />
                            <span className="rightbarFollowingName">Bruni Sagnite</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img className='rightbarFollowingImg' src="/assets/caro.jpg" alt="" />
                            <span className="rightbarFollowingName">Bruni Sagnite</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img className='rightbarFollowingImg' src="/assets/cherry.jpg" alt="" />
                            <span className="rightbarFollowingName">Bruni Sagnite</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img className='rightbarFollowingImg' src="/assets/cherry.jpg" alt="" />
                            <span className="rightbarFollowingName">Bruni Sagnite</span>
                        </div>
                </div>
            </>
        )
    }
return(
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {profile ?<ProfileRightbar/>:<HomeRightbar/>}
            </div>
        </div>
    )
}