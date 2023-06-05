import React from 'react'
import "./profile.css"
import Topbar from '../../components/topbar/Topbar'
import RightBar from '../../components/rightbar/rightbar'
import Sidebar from '../../components/sidebar/sidebar'
import Feed from '../../components/feed/Feed'

export default function Profile(){
    return(
        <>
    <Topbar/>
        <div className="profile">
        <Sidebar/>
        <div className="profileRight">
            <div className="profileRight">
                <div className="profileRightTop"></div>
                <div className="profileRightBottom"></div>
                <Feed/>
        <RightBar/> 
        </div>
        </div>
        </div> 
    </>
    )
}