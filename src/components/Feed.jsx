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
      // normalize API response shape: some endpoints return { data: [...] } while others return [...]
      const payload = res?.data?.data ?? res?.data
      dispatch(addFeed(payload))
    }
    
    catch(err){
      console.error('Error fetching feed:',err);
    }

  }
  useEffect(() => {
    getFeed();
  }, [])
  
  // handle three states:
  // - feed === null -> loading (don't render feed area)
  // - Array.isArray(feed) && feed.length === 0 -> show empty state message
  // - otherwise -> render list of user cards
  if (!feed) return null

  if (Array.isArray(feed) && feed.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-600">No users available in the feed yet.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {/* {console.log(feed)} */}
      {<UserCard key={feed[0]._id ?? feed[0].id} user={feed[0]} />}
      {/* {Array.isArray(feed) ? feed[0].map((user) => (
        
        <UserCard key={user._id ?? user.id} user={user} />
      )) : null} */}
    </div>
  )
}
