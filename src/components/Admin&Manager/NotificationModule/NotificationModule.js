import * as React from "react";
import './Notification.css'
import { useEffect , useState } from "react";
import Dashboard from "../Header/Dashboard";
import AllNotifications from './AllNotifications'
import CreateNotification from './CreateNotification'
import UpdateNotification from './UpdateNotification'


export default function HomeNotification() {
    const [isCreateNotification,setIsCreateNotification]=useState(false)
    const [isUpdateNotification,setIsUpdateNotification]=useState(false)
      const handleCreateNotification=()=>{
        setIsCreateNotification(true)
        setIsUpdateNotification(false)
      }
      const handleUpdateNotification=()=>{
        setIsCreateNotification(false)
        setIsUpdateNotification(true)
      }
      return (
        <div>
            <Dashboard />
        <div className='users-container'>
      <div className="buttons" >
        <button style={{backgroundColor:'#1d1a69'}} className='salesPersonbtn' onClick={handleCreateNotification}>Create Notification</button>
        <button style={{backgroundColor:'lightgray',color:'#010000'}} className='salesPersonbtn' onClick={handleUpdateNotification}>Update Notification</button>
      </div>
      {isCreateNotification===false && isUpdateNotification===false && (
        <AllNotifications />
      )}
    {isCreateNotification && (
      <CreateNotification />
    )}
    {isUpdateNotification && (
      <UpdateNotification  />
    )}
    </div>
    </div>
    );
}