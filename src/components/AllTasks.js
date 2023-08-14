import React, { useState, useEffect } from 'react'
import {Navigate, json, useNavigate} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import AllTaskStatus from './AllTaskStatus';
import api from './../util/api'
import CreateTask from './CreateTask'
import './index.css'
import TaskLatestStatus from './TaskLatestStatus';
import UpdateTask from './UpdateTask'

function AllTasks() {
    const [contactData,setContactData]=useState([])
    const [statusData,setStatusData]=useState(([]))
    const [isAllTasks,setIsAllTasks]=useState(false)
    const [isCreateTask,setIsCreateTask]=useState(false)
    const [isAllTaskStatus,setIsAllTaskStatus]=useState(false)
    const [isTaskLatest,setIsTaskStatus]=useState(false)
    const [isUpdateTask,setIsUpdateTask]=useState(false)
    const [taskId,setTaskId]=useState('')
    const [selectedRow,setSelectedRow]=useState([])
    const [selectedManager,setSelectedManager]=useState('')
    const [managerNames,setManagerNames]=useState([])
    const [managerName,setManagerName]=useState([])
    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get('/task/getAllTask')
                .then(res=>{
                    setContactData(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    },[])
    
   
    const handleManagerRecords=()=>{
      if (selectedManager==='' || selectedManager==='Select Manager Name'){
        api.get('/task/getAllTask')
                .then(res=>{
                    setContactData(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
      }else{
        api.get(`task/getAllTaskByManagerId/${selectedManager}`)
      .then(res=>{
        setContactData(res.data)
        console.log(res.data)
    }).catch(err => console.log(err.message))
      }
    }
    const a=contactData.map((item,index)=>{managerNames.push([item?.assignedManager?.userId,item?.assignedManager?.userName])})
    let b=contactData.map(item=>{managerName.push(item?.assignedManager?.userName)})
    const data=contactData.map((item,index)=>({...item,id:index+1,salesPersonName:item.salesPerson.user.userName,assignedManager:item.assignedManager.userName}))
    const uniquemanagers=new Set()
    for (let i of managerNames){
      const arraystring=JSON.stringify(i)
      uniquemanagers.add(arraystring)
    }
    let managers=Array.from(uniquemanagers,arraystring=>JSON.parse(arraystring))
    managers.sort(function (a, b) {
      return a[0].localeCompare(b[0]);
      });
    console.log(managers)
    const managern=[...new Set(managerName)]
    const columns=[
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
          field: "salesPersonName",
          headerName: "SalesPerson Name",
          width: 160,
          headerClassName: "table-header",
          cellClassName: "table-cell",
        },
        {
          field: "taskDescription",
          headerName: "Task Description",
          width: 160,
          headerClassName: "table-header",
          cellClassName: "table-cell",
        },
        {
          field: "startDate",
          headerName: "Start Date",
          width: 160,
          headerClassName: "table-header",
          cellClassName: "table-cell",
        },
        {
          field: "dueDate",
          headerName: "Due Date",
          width: 160,
          headerClassName: "table-header",
          cellClassName: "table-cell",
        },
        {
          field: "assignedManager",
          headerName: "Assigned Manager",
          width: 160,
          headerClassName: "table-header",
          cellClassName: "table-cell",
        },
    ]
    const onRowHandleClick=(params)=>{
      setSelectedRow(params.id)
      console.log(params.row.taskId)
      setTaskId(params.row.taskId)
    }
    console.log(taskId)
    const handleCreateTask=()=>{
      setIsAllTasks(false)
      setIsCreateTask(true)
      setIsTaskStatus(false)
      setIsAllTaskStatus(false)
      setIsUpdateTask(false)
    }
    const handleAllTasks=()=>{
      setIsAllTasks(true)
      setIsCreateTask(false)
      setIsTaskStatus(false)
      setIsAllTaskStatus(false)
      setIsUpdateTask(false)
    }
    const handleTaskStatusHistory=async()=>{
      setIsAllTasks(false)
      setIsCreateTask(false)
      setIsAllTaskStatus(true)
      setIsTaskStatus(false)
      setIsUpdateTask(false)
      
    }
    const handleLatestStatus=()=>{
      setIsAllTasks(false)
      setIsCreateTask(false)
      setIsAllTaskStatus(false)
      setIsTaskStatus(true)
      setIsUpdateTask(false)
    }
    const handleUpdateTask=()=>{
      setIsAllTasks(false)
      setIsCreateTask(false)
      setIsAllTaskStatus(false)
      setIsTaskStatus(false)
      setIsUpdateTask(true)
    }
    console.log(statusData)
  return (
    <div className='sidenav-users-container'>
      <div  >
        <Navbar expand="lg" className="flex-column custom-navbar">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
          <Nav.Link onClick={handleAllTasks}>
            All Tasks
          </Nav.Link>
          <Nav.Link onClick={handleCreateTask}>
            Create Task
          </Nav.Link>
          <Nav.Link onClick={handleTaskStatusHistory}>
            Task Status History
          </Nav.Link>
          <Nav.Link onClick={handleLatestStatus}>
            Task Latest Status
          </Nav.Link>
          <Nav.Link onClick={handleUpdateTask}>
            Update Task
          </Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      {isAllTasks && (
        <div className='users-container'>
        <div className='headings'>
            <h1 className='main-heading'>All Tasks</h1>
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
                <option value={item[0]}key={index[0]}>{item[0]}--{item[1]}</option>
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
      {isCreateTask && (
        <CreateTask />
      )}
      {isAllTaskStatus && (
        <AllTaskStatus taskId={taskId}/>
      )}
      {isTaskLatest && (
        <TaskLatestStatus taskId={taskId} />
      )}
      {isUpdateTask && (
        <UpdateTask taskId={taskId} />
      )}
    </div>
  )
}

export default AllTasks