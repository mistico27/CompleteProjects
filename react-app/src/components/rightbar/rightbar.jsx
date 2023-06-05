import React from 'react'
import  './rightbar.css'
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
                    <li className="rightBarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className='rightbarProfileImage' src="/assets/cherry.jpg" alt="" />
                            <span className="rightBarOnline"></span>
                        </div>
                        <span className='rightBarUsername'>
                            Viridiana Rodriguez
                        </span>
                    </li>
                    <li className="rightBarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className='rightbarProfileImage' src="/assets/cherry.jpg" alt="" />
                            <span className="rightBarOnline"></span>
                        </div>
                        <span className='rightBarUsername'>
                            Viridiana Rodriguez
                        </span>
                    </li>
                    <li className="rightBarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className='rightbarProfileImage' src="/assets/cherry.jpg" alt="" />
                            <span className="rightBarOnline"></span>
                        </div>
                        <span className='rightBarUsername'>
                            Viridiana Rodriguez
                        </span>
                    </li>
                    <li className="rightBarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className='rightbarProfileImage' src="/assets/cherry.jpg" alt="" />
                            <span className="rightBarOnline"></span>
                        </div>
                        <span className='rightBarUsername'>
                            Viridiana Rodriguez
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}