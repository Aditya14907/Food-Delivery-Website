// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import './LogInPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../ContextAPI/StoreContext'
import axios from "axios"
// eslint-disable-next-line react/prop-types
export const LogInPopUp = ({setShowLogin}) => {
    const {url,setToken} = useContext(StoreContext)
    const [currState,setCurrState] = useState("LogIn")
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogIn = async(event)=>{
        event.preventDefault()
        
        let newUrl = url;
        if(currState==="LogIn")
        {
            newUrl += "/api/user/login"
        }
        else
        {
            newUrl += "/api/user/register"
        }
        //To call the api
        const response = await axios.post(newUrl,data);
        if(response.data.success)
        {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else
        {
            alert(response.data.message)
        }
    }
return (
    <div className='login-popup'>
        <form onSubmit={onLogIn} className="login-popup-form">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="LogIn" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required/>}
                <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Write Your Password' required/>
            </div>
            <button type='submit'>{currState==="Sign Up" ? "Create account" : "LogIn"}</button>
            <div className="login-popup-condition">
                <input type='checkbox' required/>
                <p>By Counting, I agree to the Terms of Use & Privacy Policy</p>
            </div>
            <div>
                {currState==="LogIn" ? 
                <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>:
                <p>Already have an account? <span onClick={()=>(setCurrState("LogIn"))}>Login Here</span></p>}
            </div>
        </form>
    </div>
)
}

export default LogInPopUp