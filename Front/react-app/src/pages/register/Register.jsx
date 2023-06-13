import {React,useRef} from 'react'
import './register.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";



export default function Register(){
    const email= useRef();
    const password = useRef();
    const username= useRef();
    const paswordAgain =useRef();
    const navigate = useNavigate()

    const handleClick= async(e)=>{
        e.preventDefault();
        if(paswordAgain.current.value !== password.current.value){
            paswordAgain.current.setCustomValidity("passwords do not match, please fill again");
        }else{
            const user = {
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
            }
            try{

                await axios.post("/auth/register",user);
                navigate('/login');
            }catch(e){
                console.log(e);
            }
        }
    };

    return(
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">
                        Conecta-II
                    </h3>
                    <span className='loginDesc'>
                        Getting the World Closer with Conecta-II.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder='Email' required ref={email} type="email" className="loginInput" />
                        <input placeholder='User Name' required ref={username} type="String" className="loginInput" />
                        <input placeholder='Password' required ref={password} minLength="8" type="password" className="loginInput" />
                        <input placeholder='Password Again' required ref={paswordAgain} type="Password" className="loginInput" />
                        <button className='loginButton'>Sign up</button>
                        <button className="loginRegisterButton">
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}