import React, { useState } from 'react'
import useSignup from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const SignupPage = ({setIsAuth}) => {

    const [name, setName]= useState("");
    const [username, setUserame]= useState("");
    const [password, setPassword]= useState("");
    const [phone_number, setPhone_number]= useState("");
    const [profilePicture, setProfilePicture]= useState("");
    const [gender, setGender]=useState("");
    const [date_of_birth, setDate_of_birth]=useState("");
    const [role, setRole]=useState("");
    const [street, setStreet]=useState("");
    const [city, setCity]=useState("");
    const [state, setState]=useState("");
    const [zipCode, setZipCode] =useState("");

    const {signup, error, loading} = useSignup("/api/users/signup");

    const navigate = useNavigate();

    const submitHandler =async(e)=>{
        e.preventDefault();
        await signup({
            name,
            username,
            password,
            phone_number,
            profilePicture,
            gender,
            date_of_birth,
            role,
            address:{
            street,
            city,
            state,
            zipCode}
        });
        if(!error){
            console.log("signup success");
            setIsAuth(true);
            navigate("/");
        }

    }


  return (
    <div className='create'>
        <h2>Sign Up</h2>
    <form onSubmit={submitHandler}>
        <label>Name:</label>
        <input required value={name} onChange={(e)=>setName(e.target.value)}></input>
        <label>Username:</label>
        <input required value={username} onChange={(e)=>setUserame(e.target.value)}></input>
        <label>Password:</label>
        <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        <label>Phone Number:</label>
        <input required value={phone_number} onChange={(e)=>setPhone_number(e.target.value)}></input>
        <label>Profile Picture:</label>
        <input value={profilePicture} onChange={(e)=>setProfilePicture(e.target.value)}></input>
        <label>Gender:</label>
        <input required value={gender} onChange={(e)=>setGender(e.target.value)}></input>
        <label>Date of Birth:</label>
        <input type="date" required value={date_of_birth} onChange={(e)=>setDate_of_birth(e.target.value)}></input>
        <label>Role:</label>
        <select required value ={role} onChange={(e)=>setRole(e.target.value)}>
            <option value ="admin">Admin</option>
            <option value ="user">User</option>
            <option value ="moderator">Moderator</option>
        </select>
        <div>
            <p>Address:</p>
        <label>Street:</label>
        <input required value={street} onChange={(e)=>setStreet(e.target.value)}></input>
        <label>City:</label>
        <input required value={city} onChange={(e)=>setCity(e.target.value)}></input>
        <label>State:</label>
        <input required value={state} onChange={(e)=>setState(e.target.value)}/>
        <label>Zip Code:</label>
        <input required value={zipCode} onChange={(e)=>setZipCode(e.target.value)}/>
        
    </div>
    
    
    

    <button>Submit</button>
    </form></div>
  )
}

export default SignupPage