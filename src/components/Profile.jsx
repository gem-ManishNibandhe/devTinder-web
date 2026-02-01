import React from 'react'
import { EditProfile } from './EditProfile'
import { useSelector } from 'react-redux'

export const Profile = () => {
    const user =useSelector((store)=>store.user);
    
    if(!user){
        return <div>Loading...</div>
    }
  return (
    user && 
    <div className="flex justify-center my-10">
      <EditProfile user={user} />
    </div>
  )
}
