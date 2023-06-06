import React from 'react'
import './register.css'
export default function Register(){
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
                        <input placeholder='User Name' type="Username" className="loginInput" />
                        <input placeholder='Password' type="Password" className="loginInput" />
                        <input placeholder='Password Again' type="Password" className="loginInput" />

                        <button className='loginButton'>Sign up</button>
                        <button className="loginRegisterButton">
                            Log into Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}