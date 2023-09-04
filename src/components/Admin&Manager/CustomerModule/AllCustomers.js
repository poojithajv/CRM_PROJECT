import React, { useState, useEffect } from 'react'
import api from '../../../util/api'
import Dashboard from '../Header/Dashboard';
import { DataGrid } from "@mui/x-data-grid";
import './Customer.css'

function AllCustomers(){
    const [allCustomers,setAllCustomers]=useState([])

    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get('/app/getAllCustomers')
                .then(res=>{
                    setAllCustomers(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }catch(err){
            console.log(err.message)
        }
    },[])

    const data=allCustomers.map((item,index)=>({...item,id:index+1}))

    const columns = [
         {
           field: "id",
           headerName: "S.No",
           width: 60,
           headerClassName: "table-header",
           cellClassName: "table-cell",
         },
         {
           field: "customerName",
           headerName: "Customer Name",
           width: 160,
           headerClassName: "table-header",
           cellClassName: "table-cell",
         },
         {
           field: "customerDate",
           headerName: "Customer Date",
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
             field: "opportunityName",
             headerName: "Opportunity Name",
             width: 160,
             headerClassName: "table-header",
             cellClassName: "table-cell",
             renderCell: (params) => (
               <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
                 {params.value}
               </div>
             ),
           },
       ];

    return(
      <div>
        <Dashboard />
    <div className='user-container'>
        <div className='headings'>
            <h1 className='main-heading'>All Customers</h1>
        </div>
        <div style={{overflowY:'scroll',height:'400px'}}>
            {data?.length > 0 ? (
                <div className='table'>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        // onRowClick={onRowHandleClick}
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

export default AllCustomers