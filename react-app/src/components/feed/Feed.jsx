import React from 'react'
import './feed.css'
import Share from '../share/share'
import Post from '../post/post'
export default function Feed(){
return(
        <div className='feed'>
            <div className="feedWrapper">
                <Share/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    )

}