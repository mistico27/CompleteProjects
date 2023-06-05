import React from 'react'
import  './rightbar.css'
import {Users} from '../../dummyData'
import Online from '../online/online'

export default function Rightbar(){
return(
        <div className='rightbar'>
            <div className="rightbarWrapper">
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
            </div>
        </div>
    )
}