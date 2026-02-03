import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { addConnection } from '../utils/connectionSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Connections = () => {

    const connections =useSelector((store)=>store.connections);
    const dispatch=useDispatch();

    const fetchConnections = async () => {
        try {
           const res =await axios.get(BASE_URL+'/user/connections', { withCredentials: true });
           
           dispatch(addConnection(res.data.data));
        } catch (err) {
            console.error('Error fetching connections:', err);
        }
    };

    React.useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections) return
    if(connections.length===0){
        return (
            <div className='flex flex-col items-center my-10'>
                <h1 className="text-gray-600">You have no connections yet.</h1>
            </div>
        )
    }
  return (

    <div className='flex flex-col items-center my-10'>
        <h1 className="text-2xl font-bold">Connections</h1>
        {connections.map((conn)=>(
            <div key={conn._id} className="card w-full max-w-3xl bg-base-100 shadow-xl m-4 mx-auto">
                <div className="card-body flex flex-row items-center gap-4">
                    {/* left: photo */}
                    <img src={conn.photoUrl} alt="Profile" className="w-24 h-24 rounded-full" />

                    {/* right: content column - name+age on top, about at bottom */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-start">
                            <h2 className="text-lg font-semibold">{conn.firstName} {conn.lastName}</h2>
                            <span className="text-lg text-gray-500 ml-2">,{conn.age}</span>
                        </div>

                        <p className="text-sm text-gray-600 whitespace-normal">{conn.about}</p>

                        <div className="flex justify-end my-3">
                            <button className="btn btn-primary mx-3">Message</button>
                            <button className="btn btn-secondary">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}
