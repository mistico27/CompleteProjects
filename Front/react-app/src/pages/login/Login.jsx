import {React,useContext,useRef} from 'react'
import './login.css'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';

export default function Login(){
    const email= useRef();
    const password = useRef();
    const {user,isFetching,error,dispatch}=useContext(AuthContext)

    const handleClick=(e)=>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch)
    }
    console.log(user);

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
                        <input placeholder='Email' type="Email" required className="loginInput"  ref={email}/>
                        <input placeholder='Password' required minLength={"8"} type="Password"
                         className="loginInput" ref={password} />
                        <button className='loginButton' type="submit" disabled={isFetching}>{isFetching ? <RotateRightRoundedIcon color="white"/> :"Log In"}</button>
                        <span className='loginForgot'>forgot Password??</span>
                        <button className="loginRegisterButton">Create a New Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}