import React, { use, useEffect } from 'react'
import { NavBar } from './NavBar'
import { Navigate, Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { BASE_URL } from '../utils/constants'
import {addUser} from "../utils/userSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData= useSelector((store)=>store.user);
  
  const featchUser =async()=>{
    if(userData){return ;}  // if user data is already present then no need to fetch again
    try{
      const res = await axios.get(BASE_URL+'/profile',{withCredentials:true})
      
      const userPayload = res?.data?.data ?? res?.data
     
      dispatch(addUser(userPayload))
    }
    catch(err){
      if(err.status===401){
        navigate('/login')
      }
      
      console.error(err)
    }
  }
  useEffect(()=>{
     featchUser();
    
  },[])
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
    
  )
}
