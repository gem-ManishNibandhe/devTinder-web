import axios from 'axios'
import React,{useEffect} from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { UserCard } from './userCard'

export const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch=useDispatch();
  const getFeed=async ()=>{
    if(feed) return; // if feed is already present then no need to fetch again
    try{
      const res = await axios.get(BASE_URL+'/feed',{withCredentials:true})
      dispatch(addFeed(res.data.data))
    }
    
    catch(err){
      console.error('Error fetching feed:',err);
    }

  }
  useEffect(() => {
    getFeed();
  }, [])
  
  return (
    feed && (
    <div className="flex flex-wrap justify-center gap-4 p-4">
        <UserCard user={feed[0]}/>
    </div>
  )
)
}
