import React, { useState, useEffect } from 'react'
import CreateContact from './CreateContact'
import AllContacts from './AllContacts';
import UpdateContact from '../ContactModule/UpdateContact'
import UploadFile from './UploadFile'
import Dashboard from '../Header/Dashboard';
import './Contact.css'

function ContactModule() {
    const [isUploadFile,setIsUploadFile]=useState(false)
    const [isCreateContact,setIsCreateContact]=useState(false)
    const [isUpdateContact,setIsUpdateContact]=useState(false)
     const handleUploadFile=()=>{
      setIsUploadFile(true)
        setIsCreateContact(false)
        setIsUpdateContact(false)
     }
      const handleIsCreateContact=()=>{
        setIsUploadFile(false)
        setIsCreateContact(true)
        setIsUpdateContact(false)
      }
      const handleIsUpdateContact=()=>{
        setIsUploadFile(false)
        setIsCreateContact(false)
        setIsUpdateContact(true)
      }
  return (
    <div>
        <Dashboard />
        <div className='users-container'>
        <div className='buttons'>
          <button className='salesPersonbtn' onClick={handleUploadFile}>Upload contacts</button>
            <button style={{backgroundColor:'#1d1a69'}} className='salesPersonbtn' onClick={handleIsCreateContact}>Create Contact</button>
            <button style={{backgroundColor:'lightgray',color:'#010000'}} className='salesPersonbtn' onClick={handleIsUpdateContact}>Update Contact</button>
        </div>
        {isCreateContact===false && isUpdateContact===false && isUploadFile===false && (
            <AllContacts />
        )}
        {isUploadFile && (
          <UploadFile />
        )}
        {isCreateContact && (
            <CreateContact />
        )}
        {isUpdateContact && (
            <UpdateContact />
        )}
        </div>
    </div>
  )
}

export default ContactModule