import React,{useState,useEffect} from 'react'
import { DataGrid } from "@mui/x-data-grid";
import api from './../util/api'
import './index.css'

function SalesPersonTasks({salesPersonId}) {
  const [selectedRow,setSelectedRow]=useState([])
    const [tasksData,setTasksData]=useState([])
    const [contactId,setContactId]=useState('')
    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get(`task/getAllTaskBySalesPersonId/${salesPersonId}`)
                .then(res=>{
                    setTasksData(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    },[])
    const data=tasksData.map((item,index)=>({...item,id:index+1,salesPersonName:item.salesPerson.user.userName,assignedManager:item.assignedManager.userName,contactName:item.contactId.firstName+item.contactId.lastName}))
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
          field: "contactName",
          headerName: "Contact Name",
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
      console.log(params?.row?.contactId?.contactId)
      localStorage.setItem('contactId',params?.row?.contactId?.contactId)
    }
  return (
    <div>
        <div className='users-container'>
        <div className='headings'>
            <h1 className='main-heading'>My Tasks</h1>
            {/* <h2 onClick={handleContactDetail} className='sub-heading'>Contact Detail</h2> */}
        </div>
        <div style={{overflowY:'auto',height:'400px'}}>
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
    </div>
  )
}

export default SalesPersonTasks