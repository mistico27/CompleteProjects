import React from 'react'
import './login.css'
export default function Login(){
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
                    <div className="loginBox">
                        <input placeholder='Email' type="Email" className="loginInput" />
                        <input placeholder='Password' type="Password" className="loginInput" />
                        <button className='loginButton'>Log In</button>
                        <span className='loginForgot'>forgot Password??</span>
                        <button className="loginRegisterButton">Create a New Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}