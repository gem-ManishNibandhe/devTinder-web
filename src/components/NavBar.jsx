import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'

export const NavBar = () => {
  // `userSlice` stores { user: <userObject|null> } so select the inner `user` value.
  const user = useSelector((store) => store.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogOut= async()=>{  

    try{
      await axios.post(BASE_URL+'/logout',{}, {withCredentials:true});  
      // window.location.href='/login'; // redirect to login page after logout
      dispatch(removeUser());  // remove user from the store
      return navigate('/login');
    }
    catch(err){
      console.error('Error logging out:',err);
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">🧑🏼‍💻 DevTinder</a>
  </div>
  {user && (
    <>
      <div className="flex-none mr-4">
        <p>Welcome, {user.firstName}</p>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end mx-5">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Photo"
                src={user?.photoUrl} />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Requests</Link></li>
            <li><a onClick={handleLogOut}>Logout</a></li>
          </ul>
        </div>
      </div>
    </>
  )}
</div>

 
  )
}
