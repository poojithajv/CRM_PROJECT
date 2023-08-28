import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Navbar, Nav } from "react-bootstrap";
import "./index.css";
import api from './../util/api'
import { useEffect , useState } from "react";


export default function HomeNotification() {
    const [notificationData,setNotificationData]= useState([]);
    const [selectedRow,setSelectedRow]=useState([])
    const [dat,setDat]=useState([])
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
          width: 180,
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
          width: 250,
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
            width: 160,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "role",
            headerName: "Role",
            width: 160,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
      ];
      const onRowHandleClick=(params)=>{
        setSelectedRow(params.id)
        setDat(params.row)
        localStorage.setItem('notificationRow',JSON.stringify(params?.row))
      }
      return (

        <div className='user-container'>
        <div className='headings'>
            <h1 className='main-heading'>All Notifications</h1>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            </div>
        </div>
        <div style={{overflowY:'scroll',height:'400px'}}>
            {data.length > 0 ? (
                <div className='table'>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        onRowClick={onRowHandleClick}
                    />
                </div>
            ): (
                "No Data Found"
            )}
        </div>
    </div>
    );
}