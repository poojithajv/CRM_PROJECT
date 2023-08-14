import React, { useState, useEffect } from 'react'
import {Navigate, useNavigate,Link} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import api from './../util/api'
import './index.css'
import CreateOpportunity from './CreateOpportunity';

function AllOpportunities() {
    const [opportunitiesData,setOpportunitiesData]=useState([])
    const [opportunitiesSubData,setOpportunitiesSubData]=useState([])
    const [isAllOpportunities,setIsAllOpportunities]=useState(false)
    const [isCreateOpportunity,setIsCreateOpportunity]=useState(false)
    const [selectedRow,setSelectedRow]=useState([])

    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get('/app/getAllOpportunities')
                .then(res=>{
                    setOpportunitiesData(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
                api.get('/app/getAllOpportunitySub')
                .then(res=>{
                    setOpportunitiesSubData(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    },[])

    const data=[...opportunitiesData,...opportunitiesSubData].map((item,index)=>({...item,id:index+1,contactName:item.contact.firstName+item.contact.lastName,opportunityType:item.status.statusValue,
    contactEmail:item.contact.email,offeringName:item.offering.offeringName,offeringValidDate:item.offering.validTillDate}))
    console.log(data)

    const columns = [
        {
         width: 60,
         headerClassName: "table-header",
         cellClassName: "table-cell",
         renderCell: (params) => (
               <input
                 name='poo'
                 type='radio'
                 checked={params.row.id===selectedRow}
                 className="button1"
               />
             ),
        },
         {
           field: "id",
           headerName: "S.No",
           width: 60,
           headerClassName: "table-header",
           cellClassName: "table-cell",
         },
         {
           field: "opportunityName",
           headerName: "Opportunity Name",
           width: 160,
           headerClassName: "table-header",
           cellClassName: "table-cell",
         },
         {
           field: "opportunitySize",
           headerName: "Opportunity Size",
           width: 160,
           headerClassName: "table-header",
           cellClassName: "table-cell",
           renderCell: (params) => (
             <div style={{ wordBreak:'break-word',whiteSpace: "wrap", lineHeight: "1" }}>
               {params.value}
             </div>
           ),
         },
         {
             field: "opportunityCreatedDate",
             headerName: "Opportunity Created Date",
             width: 160,
             headerClassName: "table-header",
             cellClassName: "table-cell",
             renderCell: (params) => (
               <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
                 {params.value}
               </div>
             ),
           },
           {
             field: "opportunityType",
             headerName: "Opportunity Type",
             width: 160,
             headerClassName: "table-header",
             cellClassName: "table-cell",
             renderCell: (params) => (
               <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
                 {params.value}
               </div>
             ),
           },
           {
             field: "contactName",
             headerName: "Contact Name",
             width: 160,
             headerClassName: "table-header",
             cellClassName: "table-cell",
           },
           {
             field: "contactEmail",
             headerName: "Contact Email",
             width: 160,
             headerClassName: "table-header",
             cellClassName: "table-cell",
           },
           {
             field: "offeringName",
             headerName: "Offering Name",
             width: 120,
             headerClassName: "table-header",
             cellClassName: "table-cell",
           },
           {
            field: "offeringValidDate",
            headerName: "Offering Valid Date",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
          },
          {
            field: "noOfInstallments",
            headerName: "No of Installments",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
          },
          {
            field: "price",
            headerName: "Price",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
          },
          {
            field: "duration",
            headerName: "Duration",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
          },
          {
            field: "currency",
            headerName: "Currency",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
          },
       ];

    const handleAllOpportunities=()=>{
        setIsAllOpportunities(true)
        setIsCreateOpportunity(false)
      }
      const handleCreateOpportunity=()=>{
        setIsAllOpportunities(false)
        setIsCreateOpportunity(true)
      }

      const onRowHandleClick=(params)=>{
        setSelectedRow(params.id)
      }

  return (
    <div className='sidenav-users-container'>
      <div  >
        <Navbar expand="lg" className="flex-column custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link onClick={handleAllOpportunities}>
              All Opportunities
            </Nav.Link>
            <Nav.Link onClick={handleCreateOpportunity} >
              Create Opportunity
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
      {isAllOpportunities && (
        <div className='users-container'>
        <div className='headings'>
            <h1 className='main-heading'>All Opportunities</h1>
        </div>
        <div style={{overflowY:'scroll',height:'400px'}}>
            {data.length > 0 ? (
                <div className='table'>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        onRowClick={onRowHandleClick}
                        // onRowSelectionModelChange={onRowSelection}
                        // initialState={{
                        // pagination: {
                        //     paginationModel: { page: 0, pageSize: 10 },
                        // },
                        // }}
                        // pageSizeOptions={[5, 10, 15, 20]}
                    />
                </div>
            ): (
                "No Data Found"
            )}
        </div>
    </div>
      )}
    {isCreateOpportunity && (
      <CreateOpportunity />
    )}
    </div>
  )
}

export default AllOpportunities