import React, { useState, useEffect } from 'react'
import {Navigate, useNavigate,Link} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import CreateOffering from './CreateOffering'
import UpdateOffering from './UpdateOffering'
import api from './../util/api'
import './index.css'

function AllOffering() {
    const [offeringData,setOfferingData]=useState([])
    const [dat,setDat]=useState([])
    const [isAllOffering,setIsAllOffering]=useState(false)
    const [isCreateOffering,setIsCreateOffering]=useState(false)
    const [isUpdateOffering,setIsUpdateOffering]=useState(false)
    const [selectedRow,setSelectedRow]=useState([])

    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get('/OfferingController/get_all_offering')
                .then(res=>{
                    setOfferingData(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    },[])

      let data=offeringData.map((item,index)=>({...item,id:index+1}))
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
          headerName: "Offer Id",
          width: 70,
          cellClassName: "table-cell",
          headerClassName: "table-header",
        },
        {
          field: "offeringCategory",
          headerName: "Offering Category",
          width: 130,
          cellClassName: "table-cell",
          headerClassName: "table-header",
        },
        {
            field: "offeringName",
            headerName: "Offering  Name",
            width: 150,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "ctc",
            headerName: "CTC",
            width: 90,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "projectCost",
            headerName: "Project Cost",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "actualCost",
            headerName: "Actual Cost",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "costType",
            headerName: "Cost Type",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "validTillDate",
            headerName: "Valid Till Date",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          }
      ];
    const onRowHandleClick=(params)=>{
        setSelectedRow(params.id)
        setDat(params.row)
      }
      const handleCreateOffering=()=>{
        setIsAllOffering(false)
        setIsCreateOffering(true)
        setIsUpdateOffering(false)
      }
      const handleUpdateOffering=()=>{
        setIsAllOffering(false)
        setIsCreateOffering(false)
        setIsUpdateOffering(true)
      }
      const handleAllOfferings=()=>{
        setIsAllOffering(true)
        setIsCreateOffering(false)
        setIsUpdateOffering(false)
      }
  return (
    <div className='sidenav-users-container'>
      <div  >
        <Navbar expand="lg" className="flex-column custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link onClick={handleAllOfferings}>
              All Offerings
            </Nav.Link>
            <Nav.Link onClick={handleCreateOffering} >
              Create Offering
            </Nav.Link>
            <Nav.Link onClick={handleUpdateOffering} >
              Update Offering
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
      {isAllOffering && (
        <div className='users-container'>
        <div className='headings'>
            <h1 className='main-heading'>All Offerings</h1>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            {/* <h2 style={{marginRight:'10px'}} className='sub-heading'>Add User</h2>
            <h2 onClick={()=>navigate('/update_user',{state:dat})} className='sub-heading'>Update User</h2> */}
            </div>
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
    {isCreateOffering && (
      <CreateOffering />
    )}
    {isUpdateOffering && (
      <UpdateOffering offer={dat} />
    )}
    </div>
  )
}

export default AllOffering