import React, { useState, useEffect } from 'react'
import api from '../../../util/api';
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import './Vendor.css'

function AllVendorsPartners() {
  const [contacts, setContacts] = useState([])
  const [contactId, setContactId] = useState(null)
  const [selectedRow,setSelectedRow]=useState([])


  const deleteHandler = () => {
    if (window.confirm('Are you sure you want to delete the contact?')) {
      api.delete(`/app/vendorpartners/deletevendorpartner/${contactId}`)
        .then(res => {
          toast.success('Contact deleted successfully')
          window.location.reload()
        }).catch(err => toast.error('Error while deleting, Please try again!'))
    }
  }

  useEffect(() => {
    api.get(`/app/vendorpartners/getallvendorpartner`)
      .then(res => {
        // console.log(res.data);
        setContacts(res.data)
        console.log(res.data)
      }).catch(err => console.log(err))

  }, [])


  const data=contacts.map((item, index) => ({ ...item, id: index + 1,name:item?.firstName+' '+item?.lastName}));

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
       headerName: "Name",
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

       },
       {
         field: "country",
         headerName: "Country",
         width: 120,
         headerClassName: "table-header",
         cellClassName: "table-cell",
       },
       {
         field: "department",
         headerName: "Department",
         width: 120,
         headerClassName: "table-header",
         cellClassName: "table-cell",
       },
       {
        field: "designation",
        headerName: "Designation",
        width: 120,
        headerClassName: "table-header",
        cellClassName: "table-cell",
      },
      {
        field: "type",
        headerName: "Contact Type",
        width: 120,
        headerClassName: "table-header",
        cellClassName: "table-cell",
      },
      {
        field: "vendorType",
        headerName: "Vendor Type",
        width: 120,
        headerClassName: "table-header",
        cellClassName: "table-cell",
      },
      {
        field: "vendorDescription",
        headerName: "Vendor Description",
        width: 120,
        headerClassName: "table-header",
        cellClassName: "table-cell",
      },
      {
        field: "partnerType",
        headerName: "Partner Type",
        width: 120,
        headerClassName: "table-header",
        cellClassName: "table-cell",
      },
      {
        field: "partnerSkills",
        headerName: "Partner Skills",
        width: 120,
        headerClassName: "table-header",
        cellClassName: "table-cell",
      },
      {
        field: "partnerDescription",
        headerName: "Partner Description",
        width: 120,
        headerClassName: "table-header",
        cellClassName: "table-cell",
      },
   ];

   const onRowHandleClick=(params)=>{
    setSelectedRow(params.id)
    setContactId(params?.row?.contactId)
    console.log(JSON.stringify(params.row))
    localStorage.setItem('vendorRow',JSON.stringify(params.row))
  }
  return (
    <div>
    <div className='user-container'>
        <div className='vendor-headings'>
            <h1 className='main-heading'>All Vendors/Partners</h1>
            <button onClick={deleteHandler}>Delete</button>
        </div>
        <div style={{height:'400px'}}>
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
    </div>
  )
}

export default AllVendorsPartners