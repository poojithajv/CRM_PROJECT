import React, { useState, useEffect } from 'react'
import {Navigate, useNavigate,Link} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import AllOffering from './AllOffering';
import CreateOffering from './CreateOffering'
import Dashboard from './Dashboard';
import UpdateOffering from './UpdateOffering'
import api from './../util/api'
import './index.css'

function OfferingModule() {
    const [isCreateOffering,setIsCreateOffering]=useState(false)
    const [isUpdateOffering,setIsUpdateOffering]=useState(false)
      const handleCreateOffering=()=>{
        setIsCreateOffering(true)
        setIsUpdateOffering(false)
      }
      const handleUpdateOffering=()=>{
        setIsCreateOffering(false)
        setIsUpdateOffering(true)
      }
  return (
    <div>
        <Dashboard />
    <div className='users-container'>
      <div  className='buttons'>
        <button style={{backgroundColor:'#1d1a69'}} className='salesPersonbtn' onClick={handleCreateOffering}>Create Offering</button>
        <button style={{backgroundColor:'lightgray',color:'#010000'}} className='salesPersonbtn' onClick={handleUpdateOffering}>Update Offering</button>
      </div>
      {isCreateOffering===false && isUpdateOffering===false && (
       <AllOffering />
      )}
    {isCreateOffering && (
      <CreateOffering />
    )}
    {isUpdateOffering && (
      <UpdateOffering  />
    )}
    </div>
    </div>
  )
}

export default OfferingModule