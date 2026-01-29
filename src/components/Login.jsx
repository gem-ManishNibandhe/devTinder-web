import React, { use } from 'react'
import axios from 'axios'
import { addUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

export const Login = () => {
    const [emailId, setEmailId] = React.useState('manunibandhe@gmail.com')
    const [password, setPassword] = React.useState('Manish@123')
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogin=async()=>{

        const res=await axios.post(BASE_URL+'/login',{
            emailId,
            password
        },{withCredentials:true}).then((res)=>{
            dispatch(addUser(res.data))    // to add data in the store
            return navigate('/');
        }).catch((err)=>{
            console.log(err)  
        })
    }
  return (
    <div className='flex justify-center my-10'>
                <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
            <h2 className="card-title">Login</h2>
            
            <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input" placeholder="" />
            </fieldset>

            <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="" />
            </fieldset>

            <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
        </div>
        </div>
    </div>
  )
}
