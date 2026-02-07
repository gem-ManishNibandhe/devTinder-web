import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { UserCard } from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

export const EditProfile = ({user}) => {
    const [firstName, setFirstName] = React.useState(user.firstName)
    const [lastName, setLastName] = React.useState(user.lastName)
    const [age, setAge] = React.useState(user.age)
    const [gender, setGender] = React.useState(user.gender || '')
    const [about, setAbout] = React.useState(user.about || '')
    const [photoUrl, setPhotoUrl] = React.useState(user.photoUrl)
    const [error, setError] = useState('')
    const [showToast, setShowToast] = useState(false)
    const dispatch=useDispatch();
   

    const saveProfile=async()=>{

        //Clears error message
        setError('');
        try{
            // await the network call and capture response
            const res = await axios.patch(BASE_URL + '/profile/edit', {
                firstName,
                lastName,
                age,
                gender,
                about,
                photoUrl
            }, { withCredentials: true })

            // dispatch updated user into store (adjust according to your API shape)
            dispatch(addUser(res?.data?.data))
            setShowToast(true)
            setTimeout(() => setShowToast(false), 3000) 
        }catch(err){
            console.error('profile update error', err?.response?.data ?? err)
            setError(err?.response?.data || "Failed to update profile")
        }
    }
  return (
    <div className='flex justify-center my-10 '>
        <div className='flex justify-center mx-10'>
                <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
            <h2 className="card-title">Update Profile</h2>
            
            <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input" placeholder="" />
            </fieldset>

            <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input" placeholder="" />
            </fieldset>
            <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input" placeholder="" />
            </fieldset>
            
            <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="input" placeholder="" />
            </fieldset>
            <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="input" placeholder="" />
            </fieldset>
            <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} className="input" placeholder="" />
            </fieldset>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
            </div>
        </div>
        </div>
        <div>
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile Saved Successfully!</span>
                    </div>
                </div>
            )}
        </div>
    </div>
    <UserCard user={{firstName, lastName, age, gender, about, photoUrl}} />
    </div>
    
    

  )
}
