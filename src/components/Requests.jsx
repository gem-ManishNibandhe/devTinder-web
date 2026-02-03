import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { addRequests } from '../utils/requestSlice';
import { useDispatch,useSelector } from 'react-redux';

export const Requests = () => {

    const requests =useSelector((store)=>store.requests);
    const dispatch=useDispatch();
    
    const fetchRequests = async() => {   
        try {
            const res=await axios.get(BASE_URL+'/user/requests/received',{withCredentials:true});
            
            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.error('Error fetching requests:', err);
        }
    }

    React.useEffect(() => {
        fetchRequests();
    }, []);

  if(!requests) return
    if(requests.length===0){
        return (
            <div className='flex flex-col items-center my-10'>
                <h1 className="text-gray-600">You have no requests  yet.</h1>
            </div>
        )
    }
  return (

    <div className='flex flex-col items-center my-10'>
        <h1 className="text-2xl font-bold">Connection Requests</h1>
        {requests.map((req)=>(
            <div key={req._id} className="card w-full max-w-3xl bg-base-100 shadow-xl m-4 mx-auto">
                <div className="card-body flex flex-row items-center gap-4">
                   
                    <img src={req.fromUserId.photoUrl} alt="Profile" className="w-24 h-24 rounded-full" />

                    {/* right: content column - name+age on top, about at bottom */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-start">
                            <h2 className="text-lg font-semibold">{req.fromUserId.firstName} {req.fromUserId.lastName}</h2>
                            <span className="text-lg text-gray-500 ml-2">,{req.fromUserId.age}</span>
                        </div>

                        <p className="text-sm text-gray-600 whitespace-normal">{req.fromUserId.about}</p>  
                        <div className="flex justify-end my-3 items-center">
                            <button className="btn btn-primary mx-3">Reject</button>
                            <button className="btn btn-secondary">Accept</button>    
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}
