import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Navbar, Nav } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import "./index.css";
import api from './../util/api'
import { useEffect , useState } from "react";
import CreateNotification from './CreateNotification'
import UpdateNotification from './UpdateNotification'
import { useLocation } from "react-router-dom";


export default function HomeNotification() {
    const [notificationData,setNotificationData]= useState([]);
    const [isAllNotification,setIsAllNotifications]=useState(false)
    const [isCreateNotification,setIsCreateNotification]=useState(false)
    const [isUpdateNotification,setIsUpdateNotification]=useState(false)
    const [selectedRow,setSelectedRow]=useState([])
    const [dat,setDat]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get('/app/notifications/getnotifications')
                .then(res=>{
                    setNotificationData(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    },[])
      let data=notificationData.map((item,index)=>({...item,id:index+1}))
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
          headerName: "Notification Id",
          width: 160,
          cellClassName: "table-cell",
          headerClassName: "table-header",
        },
        {
          field: "notificationType",
          headerName: "Notification Type",
          width: 130,
          cellClassName: "table-cell",
          headerClassName: "table-header",
          renderCell: (params) => (
            <span>
              {params.row.notificationType && typeof params.row.notificationType === "object"
                ? params.row.notificationType.statusValue
                : ""}
            </span>
          ),
        },
        {
          field: "notificationTemplate",
          headerName: "Notification Template",
          width: 160,
          cellClassName: "table-cell",
          headerClassName: "table-header",
        },
        {
            field: "remindBefore",
            headerName: "Remind Before",
            width: 150,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "subject",
            headerName: "Subject",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "role",
            headerName: "Role",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
      ];
      const onRowHandleClick=(params)=>{
        setSelectedRow(params.id)
        setDat(params.row)
      }
      const handleAllNotifications=()=>{
        setIsAllNotifications(true)
        setIsCreateNotification(false)
        setIsUpdateNotification(false)
      }
      const handleCreateNotification=()=>{
        setIsAllNotifications(false)
        setIsCreateNotification(true)
        setIsUpdateNotification(false)
      }
      const handleUpdateNotification=()=>{
        setIsAllNotifications(false)
        setIsCreateNotification(false)
        setIsUpdateNotification(true)
      }
      return (
        <div className='sidenav-users-container'>
      <div  >
        <Navbar expand="lg" className="flex-column custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link onClick={handleAllNotifications}>
              All Notifications
            </Nav.Link>
            <Nav.Link onClick={handleCreateNotification} >
              Create Notification
            </Nav.Link>
            <Nav.Link onClick={handleUpdateNotification} >
              Update Notification
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
      {isAllNotification && (
        <div className='users-container'>
        <div className='headings'>
            <h1 className='main-heading'>All Notifications</h1>
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
    {isCreateNotification && (
      <CreateNotification />
    )}
    {isUpdateNotification && (
      <UpdateNotification notification={dat} />
    )}
    </div>
    );
}