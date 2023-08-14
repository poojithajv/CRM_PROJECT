import React, { useState, useEffect } from 'react'
import {Navigate, useNavigate,Link} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import UserRegister from './UserRegister';
import EditUser from './EditUser';
import api from './../util/api'
import './index.css'

function AllUsers() {
    const [users,setUsers]=useState([])
    const [dat,setDat]=useState([])
    const [rolesData,setRolesData]=useState([])
    const [namesData,setNamesData]=useState([])
    const [managerData,setManagerData]=useState([])
    const [selectedRole,setSelectedRole]=useState('')
    const [selectedName,setSelectedName]=useState('')
    const [selectedManager,setSelectedManager]=useState('')
    const [isAllUsers,setIsAllUsers]=useState(false)
    const [isCreateUser,setIsCreateUser]=useState(false)
    const [isUpdateUser,setIsUpdateUser]=useState(false)
    const [selectedRow,setSelectedRow]=useState([])
    const navigate=useNavigate()
    const [search, setSearch] = useState('');
    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get('/api/getAllUsersNDtos')
                .then(res=>{
                    setUsers(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    },[])
    const handleRecords=()=>{
      if (selectedRole==='' || selectedRole==='Select Role'){
        api.get('/api/getAllUsersNDtos')
                .then(res=>{
                    setUsers(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
      }else{
        api.get(`/api/getAllByRole/${selectedRole}`)
      .then(res=>{
        setUsers(res.data)
        console.log(res.data)
    }).catch(err => console.log(err.message))
      }
    }

    const handleNameRecords=()=>{
      if (selectedName==='' || selectedName==='Select Name'){
        api.get('/api/getAllUsersNDtos')
                .then(res=>{
                    setUsers(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
      }else{
        api.get(`/api/getAllUsersByTheirName/${selectedName}`)
      .then(res=>{
        setUsers(res.data)
        console.log(res.data)
    }).catch(err => console.log(err.message))
      }
    }
    console.log(selectedName)
    const handleManagerRecords=()=>{
      if (selectedManager==='' || selectedManager==='Select Manager Name'){
        api.get('/api/getAllUsersNDtos')
                .then(res=>{
                    setUsers(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
      }else{
        api.get(`/api/getAllBasedOnReportingId/${selectedManager}`)
      .then(res=>{
        setUsers(res.data)
        console.log(res.data)
    }).catch(err => console.log(err.message))
      }
    }
    let a=users.map(item=>{rolesData.push(item.role)})
    
    let b=users.map(item=>{namesData.push(item.userName)})
    let c=users.map(item=>{managerData.push([item.reportingUsrId,item.reportingUsrName])})
    const uniquemanagers=new Set()
    for (let i of managerData){
      const arraystring=JSON.stringify(i)
      uniquemanagers.add(arraystring)
    }
    let managers=Array.from(uniquemanagers,arraystring=>JSON.parse(arraystring))
    managers.sort(function (a, b) {
      return a[0].localeCompare(b[0]);
      });
    // let d=users.filter(item=>{
    //   if (item.authorities[0].authority.toLowerCase().includes('manager')){
    //     return item.userId
    //   }})
    // let c=d.map(item=>{managerData.push(item.userId)})
    let data = users.map((item, index) => ({ ...item, id: index + 1}));
    const roles=[...new Set(rolesData)]
    const names=[...new Set(namesData)]
    // const managers=[...new Set(managerData)]
    // const [managerNames,setManagerNames]=useState([])
    // for (let i of managers){
    //   api.get(`/api/getUserById/${i}`)
    //   .then(res=>{
    //     setManagerNames([...new Set([...managerNames,res.data.userName])])
    //   }).catch(err => console.log(err.message))
    // }
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
          field: "userName",
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
            field: "mobileNo",
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
            field: "altMobileNo",
            headerName: "Alternate Mobile Number",
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
            field: "role",
            headerName: "Role",
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
            field: "statusValue",
            headerName: "Status",
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
            field: "reportingUsrName",
            headerName: "Reporting To User Name",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
            // renderCell: (params) => (
            //   <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
            //     {params.value}
            //   </div>
            // ),
          },
        // {
        //   field: "Update",
        //   headerName: "Update User",
        //   width: 100,
        //   headerClassName: "table-header",
        //   cellClassName: "table-cell",
        //   sortable: false,
        //   renderCell: (params) => (
        //     <button
        //       className="button1"
        //       onClick={() => navigate("/update_user", { state: params.row })}
        //       style={{ padding: "3px", width: "60px" }}
        //     >
        //       Update
        //     </button>
        //   ),
        // },
        {
          field: "View",
          headerName: "View Data",
          width: 100,
          headerClassName: "table-header",
          cellClassName: "table-cell",
          sortable: false,
          renderCell: (params) => (
            <button
              className="button1"
              onClick={() => navigate("/managerWiseData", { state: params.row})}
              style={{ padding: "3px", width: "60px" }}
            >
              View
            </button>
          ),
        },
      ];
      const handleSearch = (e) => {
        setSearch(e.target.value);
      };
      
      
      
      //const searchRoleData=finalData?.filter((item)=>item?.role?.statusValue?.toLowerCase().includes(search?.searchRole?.toLowerCase()))
      //const searchIdData=searchRoleData?.filter((item)=>item?.userId.includes(search?.searchId))
      //const searchNameData=searchIdData?.filter((item)=>item?.userName?.toLowerCase().includes(search?.searchName?.toLowerCase()))
      // const onRowSelection = (id) => {
      //   console.log(id)
      //   navigate("/update_user", { state: finalData[id - 1] });
      // };
      const onRowHandleClick=(params)=>{
        setSelectedRow(params.id)
        setDat(params.row)
      }
      const handleCreateUser=()=>{
        setIsCreateUser(true)
        setIsAllUsers(false)
        setIsUpdateUser(false)
      }
      const handleUpdateUser=()=>{
        setIsUpdateUser(true)
        setIsAllUsers(false)
        setIsCreateUser(false)
      }
      const handleAllUsers=()=>{
        setIsAllUsers(true)
        setIsCreateUser(false)
        setIsUpdateUser(false)
      }
  return (
    <div className='sidenav-users-container'>
      <div  >
        <Navbar expand="lg" className="flex-column custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link onClick={handleAllUsers}>
              All Users
            </Nav.Link>
            <Nav.Link onClick={handleCreateUser} >
              Create User
            </Nav.Link>
            <Nav.Link onClick={handleUpdateUser} >
              Update User
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
      {isAllUsers && (
        <div className='users-container'>
        <div className='headings'>
            <h1 className='main-heading'>All Users</h1>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <h2 style={{marginRight:'10px'}} className='sub-heading'>Add User</h2>
            <h2 onClick={()=>navigate('/update_user',{state:dat})} className='sub-heading'>Update User</h2>
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
           <div className='search-cont'>
            <select value={selectedRole} onChange={(e)=>setSelectedRole(e.target.value)} >
              <option value='' >Select Role</option>
              {roles.map((item,index)=>
                <option  key={index}>{item}</option>
              )}
            </select>
            <button type="button" onClick={handleRecords}>
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <div className='search-cont'>
            <select value={selectedName} onChange={(e)=>setSelectedName(e.target.value)}>
              <option key='nam'>Select Name</option>
              {names.map((item,index)=>
                <option key={index}>{item}</option>
              )}
            </select>
            <button type="button" onClick={handleNameRecords}>
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div> 
          <div className='search-cont'>
            <select value={selectedManager} onChange={(e)=>setSelectedManager(e.target.value)}>
              <option key='manager'>Select Manager Name</option>
              {managers.map((item,index)=>
                <option value={item[0]}key={index[0]}>{item[0]} -- {item[1]}</option>
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
    {isCreateUser && (
      <UserRegister />
    )}
    {isUpdateUser && (
      <EditUser data={dat} />
    )}
    </div>
  )
}

export default AllUsers