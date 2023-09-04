import React, { useState} from 'react'
import { useLocation } from 'react-router-dom';
import AllUsers from './AllUsers';
import UserRegister from './UserRegister';
import Dashboard from '../Header/Dashboard';
import EditUser from './EditUser';
import './User.css'

function UserModule() {
  const location=useLocation()
  const [activeTab]=useState(location.state)
  console.log(activeTab)
    const [isCreateUser,setIsCreateUser]=useState(false)
    const [isUpdateUser,setIsUpdateUser]=useState(false)
      const handleCreateUser=()=>{
        setIsCreateUser(true)
        setIsUpdateUser(false)
      }
      const handleUpdateUser=()=>{
        setIsUpdateUser(true)
        setIsCreateUser(false)
      }
  return (
    <div>
      <Dashboard active={activeTab}/>
    <div className='users-container'>
      <div className='buttons'>
        <button style={{backgroundColor:'#1d1a69'}} className='userbtn' onClick={handleCreateUser}>Create User</button>
        <button style={{backgroundColor:'lightgray',color:'#010000'}} className='userbtn' onClick={handleUpdateUser}>Update User</button>
      </div>
    {isCreateUser===false && isUpdateUser===false ? (
     <AllUsers />
     ) : null}
    {isCreateUser && (
      <UserRegister />
    )}
    {isUpdateUser && (
      <EditUser  />
    )}
    </div>
    </div>
  )
}

export default UserModule