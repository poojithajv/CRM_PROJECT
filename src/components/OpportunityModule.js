import React, { useState, useEffect } from 'react'
import {Navigate, useNavigate,Link} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import api from './../util/api'
import UpdateOpportunity from './UpdateOpportunity'
import AllOpportunities from './AllOpportunities';
import AllSubOpportunities from './AllSubOpportunities'
import UpdateSubOpportunity from './UpdateSubOpportunity'
import './index.css'
import Dashboard from './Dashboard';

function OpportunityModule() {
    const [isAllOpportunities,setIsAllOpportunities]=useState(false)
    const [isUpdateOpportunity,setIsUpdateOpportunity]=useState(false)
    const [isAllSubOpportunities,setIsAllSubOpportunities]=useState(false)
    const [isUpdateSubOpportunity,setIsUpdateSubOpportunity]=useState(false)
    const [selectedRow,setSelectedRow]=useState([])

    // const handleAllOpportunities=()=>{
    //     setIsAllOpportunities(true)
    //     setIsUpdateOpportunity(false)
    //     setIsAllSubOpportunities(false)
    //     setIsUpdateSubOpportunity(false)
    //   }
      const handleUpdateOpportunity=()=>{
        setIsAllOpportunities(false)
        setIsUpdateOpportunity(true)
        setIsAllSubOpportunities(false)
        setIsUpdateSubOpportunity(false)
      }
      const handleAllSubOpportunities=()=>{
        setIsAllOpportunities(false)
        setIsUpdateOpportunity(false)
        setIsAllSubOpportunities(true)
        setIsUpdateSubOpportunity(false)
      }
      const handleUpdateSubOpportunity=()=>{
        setIsAllOpportunities(false)
        setIsUpdateOpportunity(false)
        setIsAllSubOpportunities(false)
        setIsUpdateSubOpportunity(true)
      }


  return (
    <div>
        <Dashboard />
    <div className='users-container'>
      {isAllSubOpportunities===false && isUpdateOpportunity===false && isUpdateSubOpportunity===false && (
        <AllOpportunities />
      )}
    {isUpdateOpportunity && (
      <UpdateOpportunity />
    )}
    </div>
    </div>
  )
}

export default OpportunityModule