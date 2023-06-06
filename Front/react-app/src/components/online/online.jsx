import React from 'react'
import "./online.css"

export default function Online({user}){
    return(
        <div>
                    <li className="rightBarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className='rightbarProfileImage' src={user.profilePicture} alt="" />
                            <span className="rightBarOnline"></span>
                        </div>
                        <span className='rightBarUsername'>
                            {user.username}
                        </span>
                    </li>
        </div>
    )
}