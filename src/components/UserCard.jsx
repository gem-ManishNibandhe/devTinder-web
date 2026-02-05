import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import {removeUserFromFeed} from '../utils/feedSlice';
import axios from 'axios';

export const UserCard  = ({user}) => {
    const dispatch=useDispatch();
    const {_id,firstName,lastName,photoUrl,age,gender,about}=user;
    const handleSendRequest=async(status,useId)=>{
        //network call to send request
        try{
            await axios.post(BASE_URL+'/request/send/'+status+'/'+useId, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(useId));
        }
        catch(err){
            console.error('Error sending request',err);
          
        }
    }
  return (
    <div>
        <div className="card bg-base-150 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
     {age && gender && <p>{age} years old, {gender}</p>} 
    <p>{about}</p>
    <div className="card-actions justify-center mt-4 gap-4">
      <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Interested
      </button>
    </div>
  </div>
</div>
         </div>
  )
}
