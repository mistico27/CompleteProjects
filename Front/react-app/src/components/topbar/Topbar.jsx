import {React,useContext} from 'react'
import "./topbar.css"
import {Search,Person3,Chat,Notifications} from "@mui/icons-material"
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"

export default function Topbar(){

    const {user}= useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

return(
    <div className="topbarcontainer">
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">
                Conecta-2<span className='autor'> autor: Christian Beltran Bedolla</span>
            </span>
            </Link>
        </div>
        <div className="topbarcenter">
            <div className='searchbar'>
               <Search className="searchIcon"/>
               <input placeholder='search for a friend,post or video' className="searchinput"/> 
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarlink">HomPage</span>
                <span className="topbarlink">Timeline</span>

            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                   <Person3/>
                   <span className="topbarIconBadge">1</span> 
                </div>
                <div className="topbarIconItem">
                <Chat/>
                <span className="topbarIconBadge">2</span> 
                </div>
                <div className="topbarIconItem">
                <Notifications/>
                <span className="topbarIconBadge">3</span>
                </div>
            </div>
            <Link to={`/profile/${user.username}`}>
            <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "caro.jpg"
            }
            alt=""
            className="topbarImg"
          />
            </Link>
        </div>


        
    </div>
)

}