import React, { useState, useEffect } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import api from './../util/api'
import UpdateOpportunity from './UpdateOpportunity'
import AllSubOpportunities from './AllSubOpportunities'
import UpdateSubOpportunity from './UpdateSubOpportunity'
import './index.css'

function AllOpportunities() {
  const navigate=useNavigate()
    const [opportunitiesData,setOpportunitiesData]=useState([])
    const [opportunities_list, setOpportunities_list] = useState(null)
    const [dat,setDat]=useState([])
    const [isAllOpportunities,setIsAllOpportunities]=useState(false)
    const [isUpdateOpportunity,setIsUpdateOpportunity]=useState(false)
    const [isAllSubOpportunities,setIsAllSubOpportunities]=useState(false)
    const [isUpdateSubOpportunity,setIsUpdateSubOpportunity]=useState(false)
    const [selectedRow,setSelectedRow]=useState([])

    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get('/app/getAllOpportunities')
                .then(res=>{
                    setOpportunitiesData(res.data)
                    setOpportunities_list(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
                // api.get('/app/getAllOpportunitySub')
                // .then(res=>{
                //     setOpportunitiesSubData(res.data)
                //     console.log(res.data)
                // }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    },[])

    const contactSearchHandler = (e) => {
      if (e.target.value.length > 2) {
        let regExp = new RegExp(`^${e.target.value}`, 'i')
        setOpportunitiesData(opportunities_list.filter(opportunity => {
          const contact = opportunity.contact;
          return (
            //  === regExp
            regExp.test(contact.firstName.toLowerCase())
          );
        }))
      }
      if (e.target.value.length < 3) {
        setOpportunitiesData(opportunities_list)
      }
    }
    const offeringSearchHandler = (e) => {
      if (e.target.value.length > 2) {
        let regExp = new RegExp(`^${e.target.value}`, 'i')
        setOpportunitiesData(opportunities_list.filter(opportunity => {
          const offering = opportunity.offering;
          return (
            //  === regExp
            regExp.test(offering.offeringName.toLowerCase())
          );
        }))
      }
      if (e.target.value.length < 3) {
        setOpportunitiesData(opportunities_list)
      }
    }

    const data=opportunitiesData.map((item,index)=>({...item,id:index+1,contactName:item?.contact?.firstName+item?.contact?.lastName,opportunityType:item?.status?.statusValue,
    contactEmail:item?.contact?.email,offeringName:item?.offering?.offeringName,offeringValidDate:item?.offering?.validTillDate}))
    console.log(data)

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
           field: "opportunityName",
           headerName: "Opportunity Name",
           width: 160,
           headerClassName: "table-header",
           cellClassName: "table-cell",
         },
         {
           field: "opportunitySize",
           headerName: "Opportunity Size",
           width: 160,
           headerClassName: "table-header",
           cellClassName: "table-cell",
           renderCell: (params) => (
             <div style={{ wordBreak:'break-word',whiteSpace: "wrap", lineHeight: "1" }}>
               {params.value}
             </div>
           ),
         },
        //  {
        //      field: "opportunityCreatedDate",
        //      headerName: "Opportunity Created Date",
        //      width: 160,
        //      headerClassName: "table-header",
        //      cellClassName: "table-cell",
        //      renderCell: (params) => (
        //        <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
        //          {params.value}
        //        </div>
        //      ),
        //    },
          //  {
          //    field: "opportunityType",
          //    headerName: "Opportunity Type",
          //    width: 160,
          //    headerClassName: "table-header",
          //    cellClassName: "table-cell",
          //    renderCell: (params) => (
          //      <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
          //        {params.value}
          //      </div>
          //    ),
          //  },
           {
             field: "contactName",
             headerName: "Contact Name",
             width: 160,
             headerClassName: "table-header",
             cellClassName: "table-cell",
           },
           {
             field: "contactEmail",
             headerName: "Contact Email",
             width: 160,
             headerClassName: "table-header",
             cellClassName: "table-cell",
           },
           {
             field: "offeringName",
             headerName: "Offering Name",
             width: 120,
             headerClassName: "table-header",
             cellClassName: "table-cell",
           },
           {
            field: "offeringValidDate",
            headerName: "Offering Valid Date",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
          },
          // {
          //   field: "noOfInstallements",
          //   headerName: "No of Installments",
          //   width: 120,
          //   headerClassName: "table-header",
          //   cellClassName: "table-cell",
          // },
          // {
          //   field: "price",
          //   headerName: "Price",
          //   width: 120,
          //   headerClassName: "table-header",
          //   cellClassName: "table-cell",
          // },
          // {
          //   field: "duration",
          //   headerName: "Duration",
          //   width: 120,
          //   headerClassName: "table-header",
          //   cellClassName: "table-cell",
          // },
          // {
          //   field: "currency",
          //   headerName: "Currency",
          //   width: 120,
          //   headerClassName: "table-header",
          //   cellClassName: "table-cell",
          // },
       ];

    const handleAllOpportunities=()=>{
        setIsAllOpportunities(true)
        setIsUpdateOpportunity(false)
        setIsAllSubOpportunities(false)
        setIsUpdateSubOpportunity(false)
      }
      const handleUpdateOpportunity=()=>{
        setIsAllOpportunities(false)
        setIsUpdateOpportunity(true)
        setIsAllSubOpportunities(false)
        setIsUpdateSubOpportunity(false)
      }
      const handleAllSubOpportunities=()=>{
        setIsAllOpportunities(false)
        setIsUpdateOpportunity(false)
        setIsAllSubOpportunities(true)
        setIsUpdateSubOpportunity(false)
      }
      const handleUpdateSubOpportunity=()=>{
        setIsAllOpportunities(false)
        setIsUpdateOpportunity(false)
        setIsAllSubOpportunities(false)
        setIsUpdateSubOpportunity(true)
      }

      const onRowHandleClick=(params)=>{
        setSelectedRow(params.id)
        setDat(params.row)
        localStorage.setItem('opporId',params?.row?.opportunityId)
        localStorage.setItem('oppRow',JSON.stringify(params?.row))
      }

  return (
        <div className='user-container'>
        <div className='headings'>
            <h1 className='main-heading'>All Opportunities</h1>
            <div>
              <button onClick={()=>navigate('/allSubOpportunities')}>All Sub Opportunities</button>
            </div>
        </div>
        <div className='d-flex align-items-center '>
                  <input onChange={contactSearchHandler} type="text" name='contact-name' id='contact-name' className='inp' list='contact_name' placeholder='Search by contact name' />
                  <datalist id='contact_name'>
                    {
                      opportunities_list && opportunities_list.map((item, index) => {
                        return (
                          <option key={index} value={item.contact.firstName}>{item.contact.firstName}</option>
                        )
                      })
                    }
                  </datalist>
                  <input onChange={offeringSearchHandler} type="text" name='offering-name' id='offering-name' className='inp ms-3' placeholder='Search by offering name' list='offering_name' />
                  <datalist id='offering_name'>
                    {
                      opportunities_list && opportunities_list.map((item, index) => {
                        return (
                          <option key={index} value={item.offering.offeringName}>{item.offering.offeringName}</option>
                        )
                      })
                    }
                  </datalist>
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
  )
}

export default AllOpportunities