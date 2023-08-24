import React, { useState, useEffect } from 'react'
import {Navigate, json, useNavigate} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import AllTaskStatus from './AllTaskStatus';
import api from './../util/api'
import CreateTask from './CreateTask'
import './index.css'
import TaskLatestStatus from './TaskLatestStatus';
import ChangeContact from './ChangeContact'
import UpdateTask from './UpdateTask'
import ChangeSalesPerson from './ChangeSalesPerson';
import ChangeSalesPersonContact from './ChangeSalesPersonContact'
import Dashboard from './Dashboard';
import AllTasks from './AllTasks';

function TaskModule() {
    const [contactData,setContactData]=useState([])
    const [dat,setDat]=useState([])
    const [statusData,setStatusData]=useState(([]))
    const [isAllTasks,setIsAllTasks]=useState(false)
    const [isCreateTask,setIsCreateTask]=useState(false)
    const [isAllTaskStatus,setIsAllTaskStatus]=useState(false)
    const [isTaskLatest,setIsTaskStatus]=useState(false)
    const [isUpdateTask,setIsUpdateTask]=useState(false)
    const [isChangeContact,setIsChangeContact]=useState(false)
    const [isChangeSalesPerson,setIsChangeSalesPerson]=useState(false)
    const [isChangeSalesPersonContact,setIsChangeSalesPersonContact]=useState(false)
    const [taskId,setTaskId]=useState('')
    const [selectedRow,setSelectedRow]=useState([])
    const [selectedManager,setSelectedManager]=useState('')
    const [managerNames,setManagerNames]=useState([])
    const [managerName,setManagerName]=useState([])

    const handleCreateTask=()=>{
      setIsCreateTask(true)
      // setIsTaskStatus(false)
      // setIsAllTaskStatus(false)
      // setIsUpdateTask(false)
      // setIsChangeSalesPerson(false)
      // setIsChangeContact(false)
      // setIsChangeSalesPersonContact(false)
    }
    // const handleTaskStatusHistory=async()=>{
    //   setIsCreateTask(false)
    //   setIsAllTaskStatus(true)
    //   setIsTaskStatus(false)
    //   setIsUpdateTask(false)
    //   setIsChangeSalesPerson(false)
    //   setIsChangeContact(false)
    //   setIsChangeSalesPersonContact(false)
    // }
    // const handleLatestStatus=()=>{
    //   setIsCreateTask(false)
    //   setIsAllTaskStatus(false)
    //   setIsTaskStatus(true)
    //   setIsUpdateTask(false)
    //   setIsChangeSalesPerson(false)
    //   setIsChangeContact(false)
    //   setIsChangeSalesPersonContact(false)
    // }
    // const handleUpdateTask=()=>{
    //   setIsCreateTask(false)
    //   setIsAllTaskStatus(false)
    //   setIsTaskStatus(false)
    //   setIsUpdateTask(true)
    //   setIsChangeSalesPerson(false)
    //   setIsChangeContact(false)
    //   setIsChangeSalesPersonContact(false)
    // }

    // const handleChangeSalesPerson=()=>{
    //   setIsCreateTask(false)
    //   setIsAllTaskStatus(false)
    //   setIsTaskStatus(false)
    //   setIsUpdateTask(false)
    //   setIsChangeSalesPerson(true)
    //   setIsChangeContact(false)
    //   setIsChangeSalesPersonContact(false)
    // }
    // const handleChangeContact=()=>{
    //   setIsCreateTask(false)
    //   setIsTaskStatus(false)
    //   setIsAllTaskStatus(false)
    //   setIsUpdateTask(false)
    //   setIsChangeSalesPerson(false)
    //   setIsChangeContact(true)
    //   setIsChangeSalesPersonContact(false)
    // }
    // const handleChangeSalesPersonContact=()=>{
    //   setIsCreateTask(false)
    //   setIsTaskStatus(false)
    //   setIsAllTaskStatus(false)
    //   setIsUpdateTask(false)
    //   setIsChangeSalesPerson(false)
    //   setIsChangeContact(false)
    //   setIsChangeSalesPersonContact(true)
    // }
    console.log(statusData)
  return (
    <div>
        <Dashboard />
    <div className='users-container'>
      <div className='buttons' >
          <button style={{backgroundColor:'#1d1a69'}} className='userbtn' onClick={handleCreateTask}>
            Create Task
          </button>
          {/* <button className='taskbtn' onClick={handleTaskStatusHistory}>
            Task Status History
          </button>
          <button className='taskbtn' onClick={handleLatestStatus}>
            Task Latest Status
          </button>
          <button className='taskbtn' onClick={handleUpdateTask}>
            Update Task
          </button>
          <button className='taskbtn' onClick={handleChangeSalesPerson}>
            Change SalesPerson
          </button>
          <button className='taskbtn' onClick={handleChangeContact}>
            Change Contact
          </button>
          <button className='taskbtn' onClick={handleChangeSalesPersonContact}>
            Change SalesPerson & Contact
          </button> */}
      </div>
      {isCreateTask===false && (
        <AllTasks />
      )}
      {isCreateTask && (
        <CreateTask />
      )}
      {/* {isAllTaskStatus && (
        <AllTaskStatus taskId={taskId}/>
      )}
      {isTaskLatest && (
        <TaskLatestStatus taskId={taskId} />
      )}
      {isUpdateTask && (
        <UpdateTask taskId={taskId} />
      )}
      {isChangeSalesPerson && (
        <ChangeSalesPerson taskId={taskId} openSalesPerson={true} />
      )}
      {isChangeContact && (
        <ChangeContact dat={dat} openContact={true}/>
      )}
      {isChangeSalesPersonContact && (
        <ChangeSalesPersonContact dat={dat} openSalesPersonContact={true}/>
      )} */}

    </div>
    </div>
  )
}

export default TaskModule