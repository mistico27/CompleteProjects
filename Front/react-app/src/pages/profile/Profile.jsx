import React from 'react'
import "./profile.css"
import Topbar from '../../components/topbar/Topbar'
import RightBar from '../../components/rightbar/rightbar'
import Sidebar from '../../components/sidebar/sidebar'
import Feed from '../../components/feed/Feed'

export default function Profile(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return(
        <>
    <Topbar/>
        <div className="profile">
        <Sidebar/>
        <div className="profileRight">
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                    <img className='profileCoverImg' src={`${PF}5.2 Isabel Cortes.jpg`} alt="" />
                    <img className='profileUserImg' src={`${PF}5.2 Isabel Cortes.jpg`} alt="" />
                </div>
                <div className='profileInfo'>
                    <h4 className='profileInfoName'>Isabel Cortes</h4>
                    <span className='profileInfoDesc'>Hello my friends...</span>
                </div>
                </div>
                <div className="profileRightBottom">
                <Feed/>
                <RightBar profile/> 
                </div>  
        </div>
        </div>
        </div>
    </>
    )
}