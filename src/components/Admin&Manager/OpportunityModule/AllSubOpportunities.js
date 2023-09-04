import React, { useState, useEffect } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import UpdateSubOpportunity from './UpdateSubOpportunity'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import api from '../../../util/api'
import Dashboard from '../Header/Dashboard';
const OpportunitySubList = () => {
  const dat=JSON.parse(localStorage.getItem('oppRow'))
  const [updateSubOpportunity,setUpdateSubOpportunity]=useState(false)
  const [oppSubId, setOppSubId] = useState(null)
  const [oppSubList, setOppSubList] = useState(null)
  const [selectedRow,setSelectedRow]=useState([])
  const opporId = dat.opportunityId
//   const { state } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const initialFetch = async () => {
      await api.get(`/app/getAllOpportunitySubByOpportunity/${opporId}`)
        .then(res => {
          // console.log(res.data);
          setOppSubList(res.data);
        }).catch(err => console.log(err))
    }
    initialFetch()
  }, [])
  console.log(oppSubList)
  const data=oppSubList?.map((item,index)=>({...item,id:index+1,status:item?.status?.statusValue}))
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
       field: "opportunitySubId",
       headerName: "opportunitySubId",
       width: 160,
       headerClassName: "table-header",
       cellClassName: "table-cell",
     },
     {
       field: "opportunityStatusDate",
       headerName: "Opportunity Status Date",
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
         field: "noOfInstallements",
         headerName: "noOfInstallements",
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
         field: "price",
         headerName: "price",
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
         field: "duration",
         headerName: "duration",
         width: 160,
         headerClassName: "table-header",
         cellClassName: "table-cell",
       },
       {
         field: "currency",
         headerName: "currency",
         width: 160,
         headerClassName: "table-header",
         cellClassName: "table-cell",
       },
       {
         field: "status",
         headerName: "status",
         width: 120,
         headerClassName: "table-header",
         cellClassName: "table-cell",
       },
   ];
 const  onRowHandleClick  = (params) =>{
    localStorage.setItem("subporid",params?.row?.opportunitySubId)
 }
 const handleUpdateSubOpportunity=()=>{
  setUpdateSubOpportunity(true)
 }
   return (
    <div>
      <Dashboard />
      {updateSubOpportunity ? (
        <UpdateSubOpportunity />
      ): (
        <div style={{padding:'5%',height:'90vh'}}>
        <div>
          <div className='heading1'>
      <h2 className="text-info">Opportunity Details</h2>
      <div className='btns-container'>
        {oppSubList?.length===1  && <button  onClick={handleUpdateSubOpportunity}>Update</button>}
        <button  onClick={()=>navigate('/allOpportunities')}>Opportunity List</button>
        </div>
        </div>
        <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6"><h5><span className='text-secondary'>Opp Name : </span>{dat.opportunityName}</h5>
                </div>
                <div className="col-md-6"><h5><span className='text-secondary'>Opp Size : </span>{dat.opportunitySize}</h5></div>
                <div className="col-md-6"><h5><span className='text-secondary'>Contact Name : </span>{dat?.contactSub?.contactId?.firstName} {dat?.contactSub?.contactId?.lastName}</h5></div>
                <div className="col-md-6"><h5><span className='text-secondary'>Contact Email : </span>{dat?.contactSub?.contactId?.email}</h5></div>
                <div className="col-md-6"><h5><span className='text-secondary'>Offering Name : </span>{dat?.offering?.offeringName}</h5></div>
                <div className="col-md-6"><h5><span className='text-secondary'>Offering Validity : </span>{dat?.offering?.validTillDate}</h5></div>
              </div>
            </div>
          </div>
      </div>
      <div className='user-container'>
      <div className='headings'>
          <h1 className='main-heading'>Sub Opportunities List</h1>
      </div>
      <div style={{height:'400px'}}>
          {data?.length > 0 ? (
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
      )}
      
    </div>
  )
}
export default OpportunitySubList