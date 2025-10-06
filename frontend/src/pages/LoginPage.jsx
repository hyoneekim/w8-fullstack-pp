import React, { useState } from 'react'
import useLogin from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({setIsAuth}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {login, error, loading} = useLogin("/api/users/login");

    const navigate = useNavigate();

    const submitHandler = async(e)=>{
        e.preventDefault();
        await login({username, password});
        if(!error){
            console.log("login success");
            setIsAuth(true);
            navigate("/");
            

        }

    }
  return (
    <div className='create'>
    <h2>Log In</h2>
    <form onSubmit={submitHandler}>
        <label>Username:</label>
        <input type="text" required value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <label>Password:</label>
        <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit">Log In</button>
        </form>    
        </div>
  )
}

export default LoginPage