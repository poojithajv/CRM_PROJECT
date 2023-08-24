import React,{useState} from 'react'
import {useLocation} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import api from './../util/api'
import toast from 'react-hot-toast';
import ResetPassword from './ResetPassword'
import Dashboard from './Dashboard';
import UpdateProfile from './UpdateProfile';
import './index.css'

function ProfileModule() {
    const location=useLocation()
    const [data,setData]=useState(location.state)
    const [isUpdateProfile,setIsUpdateProfile]=useState(false)
    const [isResetPassword,setIsResetPassword]=useState(false)

    const handleUpdateProfile=()=>{
      setIsUpdateProfile(true)
      setIsResetPassword(false)
    }
    const handleResetPassword=()=>{
      setIsUpdateProfile(false)
      setIsResetPassword(true)
    }
    
  return (
    <div>
        <Dashboard />
    <div className='users-container'>
      <div className='buttons' >
      <button style={{backgroundColor:'#1d1a69'}} className='salesPersonbtn' onClick={handleUpdateProfile}>Update Profile</button>
      <button style={{backgroundColor:'lightgray',color:'#010000'}} className='salesPersonbtn' onClick={handleResetPassword}>Reset Password</button>
      </div>
      {isUpdateProfile && (
        <UpdateProfile data={data}/>
      )}

      {isResetPassword && (
        <ResetPassword />
      )}
      
    </div >
    </div>
  )
}

export default ProfileModule