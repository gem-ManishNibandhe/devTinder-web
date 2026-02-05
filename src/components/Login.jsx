import React, { useState } from 'react'
import axios from 'axios'
import { addUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

export const Login = () => {
    const [emailId, setEmailId] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [isLoginForm,setLoginForm] = useState(false);
    const [error, setError] = useState('')
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSignUp=async()=>{
        
        const res=await axios.post(BASE_URL+'/signup',{
            firstName,
            lastName,
            emailId,
            password,
        },{withCredentials:true}).then((res)=>{
            dispatch(addUser(res.data.data))    // to add data in the store
            return navigate('/profile');
        }).catch((err)=>{
            setError(err.response?.data || 'Signup failed. Please try again.');
        })
    }
    const handleLogin=async()=>{

        const res=await axios.post(BASE_URL+'/login',{
            emailId,
            password
        },{withCredentials:true}).then((res)=>{
            dispatch(addUser(res.data))    // to add data in the store
            return navigate('/');
        }).catch((err)=>{
            setError(err.response?.data || 'Login failed. Please try again.');
        })
    }
  return (
    <div className='flex justify-center my-10'>
                <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
            <h2 className="card-title">{isLoginForm ? "Login" : "Sign Up"}</h2>
            {!isLoginForm && (
                <>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name</legend>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="" />
                    </fieldset>
                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" placeholder="" />
                    </fieldset>
                </>
            )}
           
            <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input" placeholder="" />
            </fieldset>

            <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="" />
            </fieldset>
            
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => isLoginForm ? handleLogin() : handleSignUp()}> {isLoginForm ? "Login" : "Sign Up"}</button>
            </div>
            <p className='text-center mt-2'>{isLoginForm ? "Don't have an account? " : "Already have an account? "} <button className="btn btn-link" onClick={() => setLoginForm(!isLoginForm)}>{isLoginForm ? "Sign Up" : "Login"}</button></p>
        </div>
        </div>
    </div>
  )
}
