import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import RightBar from '../../components/rightbar/rightbar'
import Sidebar from '../../components/sidebar/sidebar'
import Feed from '../../components/feed/Feed'
import "./home.css"

export default function Home(){
return(
    <>
    <Topbar/>
        <div className="homeContainer">
        <Sidebar/>
        <Feed/>
        <RightBar/> 
        </div> 
    </>
)

}