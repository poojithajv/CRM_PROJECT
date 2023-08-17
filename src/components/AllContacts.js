import React, { useState, useEffect } from 'react'
import {Navigate, useNavigate,Link} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import CreateContact from './CreateContact'
import UpdateContact from './UpdateContact';
import api from './../util/api'
import './index.css'

function AllContacts() {
  const navigate=useNavigate()
  const [dat,setDat]=useState([])
    const [contactData,setContactData]=useState([])
    const [managerData,setManagerData]=useState([])
    const [selectedRow,setSelectedRow]=useState([])
    const [isAllContacts,setIsAllContacts]=useState(false)
    const [isCreateContact,setIsCreateContact]=useState(false)
    const [isUpdateContact,setIsUpdateContact]=useState(false)
    const [selectedManager,setSelectedManager]=useState('')
    useEffect(()=>{
        getAllContacts()
    },[])
    
    const getAllContacts = () => {
        const apiUrl = "/ContactController/get_all_contact";
        const authToken = localStorage.getItem('token')
        // Replace this with your actual authentication token
        fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Adding the authentication header
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the server here
            const contactNames = data.map(
              (each) => `${each.firstName}-${each.contactId.slice(-5)}`
            );
            setContactData(data)
            console.log(data);
          })
          .catch((error) => {
            // Handle any error that occurred during the fetch request
            console.error("Error:", error);
          });
      };
      const handleManagerRecords=()=>{
        if (selectedManager==='' || selectedManager==='Select Manager Name'){
          api.get('/ContactController/get_all_contact')
                  .then(res=>{
                      setContactData(res.data)
                      console.log(res.data)
                  }).catch(err => console.log(err.message))
        }else{
          api.get(`ContactController/get_all_contact_by_contact_created_by/${selectedManager}`)
        .then(res=>{
          setContactData(res.data)
          console.log(res.data)
      }).catch(err => console.log(err.message))
        }
      }
      let data = contactData.map((item, index) => ({ ...item, id: index + 1,name:item.firstName+item.lastName,sourceVal:item.otherSourcetype===null ? item.source : item.otherSourcetype }));
      const a=contactData.map(item=>{managerData.push(item.contactCreatedBy)})
      const managers=[...new Set(managerData)]
      console.log(managers)
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
           field: "name",
           headerName: "User Name",
           width: 160,
           headerClassName: "table-header",
           cellClassName: "table-cell",
         },
         {
           field: "email",
           headerName: "Email",
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
             field: "mobileNumber",
             headerName: "Mobile Number",
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
             field: "address",
             headerName: "Address",
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
             field: "company",
             headerName: "Company",
             width: 160,
             headerClassName: "table-header",
             cellClassName: "table-cell",
             // renderCell: (params) => (
             //   <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
             //     {params.value}
             //   </div>
             // ),
           },
           {
             field: "country",
             headerName: "Country",
             width: 120,
             headerClassName: "table-header",
             cellClassName: "table-cell",
             // renderCell: (params) => (
             //   <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
             //     {params.value}
             //   </div>
             // ),
           },
           {
            field: "sourceVal",
            headerName: "Source",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
            // renderCell: (params) => (
            //   <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
            //     {params.value}
            //   </div>
            // ),
          },
          {
            field: "contactDepartment",
            headerName: "Contact Department",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
            // renderCell: (params) => (
            //   <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
            //     {params.value}
            //   </div>
            // ),
          },
          {
            field: "contactDestination",
            headerName: "Contact Destination",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
            // renderCell: (params) => (
            //   <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
            //     {params.value}
            //   </div>
            // ),
          },
          {
            field: "websiteURL",
            headerName: "Website URL",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
            // renderCell: (params) => (
            //   <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
            //     {params.value}
            //   </div>
            // ),
          },
          {
            field: "date",
            headerName: "Date",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
            // renderCell: (params) => (
            //   <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
            //     {params.value}
            //   </div>
            // ),
          },
          {
            field: "contactCreatedBy",
            headerName: "Contact Created By",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
            // renderCell: (params) => (
            //   <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
            //     {params.value}
            //   </div>
            // ),
          },
       ];
       const onRowHandleClick=(params)=>{
        setSelectedRow(params.id)
        setDat(params.row)
      }
      const handleIsCreateContact=()=>{
        setIsAllContacts(false)
        setIsCreateContact(true)
        setIsUpdateContact(false)
      }
      const handleIsUpdateContact=()=>{
        setIsAllContacts(false)
        setIsCreateContact(false)
        setIsUpdateContact(true)
      }
      const handleAllContacts=()=>{
        setIsAllContacts(true)
        setIsCreateContact(false)
        setIsUpdateContact(false)
      }
      console.log(dat)
  return (
    <div className='sidenav-users-container'>
      <div  >
      <Navbar className="flex-column custom-navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <Nav.Link onClick={handleAllContacts}>
            All Contacts
          </Nav.Link>
          <Nav.Link onClick={handleIsCreateContact}>
            Create Contact
          </Nav.Link>
          <Nav.Link onClick={handleIsUpdateContact}>
            Update Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
        </div>
      {isAllContacts && (
        <div className='users-container'>
        <div className='headings'>
            <h1 className='main-heading'>All Contacts</h1>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            {/* <h2 style={{marginRight:'10px'}} className='sub-heading'>Add User</h2>
            <h2 onClick={()=>navigate('/update_user',{state:dat})} className='sub-heading'>Update User</h2> */}
            </div>
        </div>
        {/* <div className='search-container'>
          <label htmlFor='searchRole' className='searchLabel'>Search By Role:
          <input
              id="searchRole"
              name="searchRole"
              value={search.searchRole}
              type="text"
              placeholder='Enter Role'
              onChange={handleSearch}
              style={{
                marginLeft: "25px",
              }}
              className="input-search"
            />
          </label>
          <label htmlFor='searchId' className='searchLabel'>Search By ID:
          <input
              id="searchId"
              name="searchId"
              value={search.searchId}
              type="text"
              placeholder='Enter ID'
              onChange={handleSearch}
              style={{
                marginLeft: "25px",
              }}
              className="input-search"
            />
          </label>
          <label htmlFor='searchName' className='searchLabel'>Search By Name:
          <input
              id="searchName"
              name="searchName"
              value={search.searchName}
              type="text"
              placeholder='Enter Name'
              onChange={handleSearch}
              style={{
                marginLeft: "25px",
              }}
              className="input-search"
            />
          </label>
        </div> */}
        {/* <div className='search-container'>
          <select value={search} onChange={handleSearch}>
            <option value=''>Select</option>
            <option value='searchByRole'>Search By Role</option>
            <option value='searchByUserName'>Search By User Name</option>
            <option value='searchByManager'>Search By Manager</option>
          </select>
        </div> */}
        <div className='search-container'>
          {/* <div className='search-cont'>
            <select value={selectedRole} onChange={(e)=>setSelectedRole(e.target.value)} >
              <option value='' >Select Role</option>
              {roles.map((item,index)=>
                <option  key={index}>{item}</option>
              )}
            </select>
            <button type="button" onClick={handleRecords}>
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div> */}
          {/* <div className='search-cont'>
            <select value={selectedName} onChange={(e)=>setSelectedName(e.target.value)}>
              <option key='nam'>Select Name</option>
              {names.map((item,index)=>
                <option key={index}>{item}</option>
              )}
            </select>
            <button type="button" onClick={handleNameRecords}>
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div> */}
          <div className='search-cont'>
            <select value={selectedManager} onChange={(e)=>setSelectedManager(e.target.value)}>
              <option key='manager'>Select Manager Name</option>
              {managers.map((item,index)=>
                <option value={item}key={index}>{item}</option>
              )}
            </select>
            <button type="button" onClick={handleManagerRecords}>
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
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
      {isCreateContact && (
        <CreateContact />
      )}
      {isUpdateContact && (
        <UpdateContact contact={dat}/>
      )}
    </div>
  )
}

export default AllContacts