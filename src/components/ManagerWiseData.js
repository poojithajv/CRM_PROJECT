import React,{useState,useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import api from './../util/api'
import { DataGrid } from "@mui/x-data-grid";
import './index.css'

function ManagerWiseData() {
    const location=useLocation()
    const [data,setData]=useState(location.state)
    const [allData,setAllData]=useState([])
    const navigate=useNavigate()
    console.log(data)
    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get('/api/getAllUsers')
                .then(res=>{
                    setAllData(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    },[])
    console.log(allData.slice(1,))
    const filterData=allData.slice(1,).filter(item=>item.reportingTo.userId===data.userId)
    const finalData=filterData.map((item, index) => ({ ...item, id: index + 1 }));
    const finalData1=finalData.map((item,index)=>({...item,role1:item.role.statusValue,status1:item.status.statusValue}))
    const columns = [
        {
          field: "id",
          headerName: "ID",
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
            field: "role1",
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
            field: "status1",
            headerName: "Status",
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
          field: "Update",
          headerName: "Update User",
          width: 100,
          headerClassName: "table-header",
          cellClassName: "table-cell",
          sortable: false,
          renderCell: (params) => (
            <button
              className="button1"
              onClick={() => navigate("/update_user", { state: params.row })}
              style={{ padding: "3px", width: "60px" }}
            >
              Update
            </button>
          ),
        },
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
  return (
    <div>
        <h1>ManagerWise Data</h1>
        <div>
            {finalData1.length > 0 ? (
                <div className='table'>
                    <DataGrid
                        rows={finalData1}
                        columns={columns}
                        // onRowSelectionModelChange={onRowSelection}
                        initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                        }}
                        pageSizeOptions={[5, 10, 15, 20]}
                    />
                </div>
            ): (
                "No Data Found"
            )}
        </div>
    </div>
  )
}

export default ManagerWiseData