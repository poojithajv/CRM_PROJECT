import React,{useState,useEffect} from 'react'
import api from './../util/api'
import './index.css'

function SalesPersonContactDetails() {
  const [data,setData]=useState([])
  let contactId=localStorage.getItem('contactId')

  useEffect(()=>{
    try{
      const fetchUsers=()=>{
          api.get(`ContactController/get_contact_by_contactId/${localStorage.getItem('contactId')}`)
          .then(res=>{
              setData(res.data)
              console.log(res.data)
          }).catch(err => console.log(err.message))
      }
      fetchUsers()
  }
  catch (error) {
      console.log(error.message);
    }
  },[])
  return (
    <div className='details-container'>
      <h1 className='contact-heading'>Contact Details</h1>
      <div className='status-container1' >
            <h2 className='sub-id'>Contact Id: {data.contactId}</h2>
            <div>
              <div className="table-data">
                <p className="th">First Name</p>
                <p className="td">{data.firstName}</p>
              </div>
              <div className="table-data">
                <p className="th">Last Name</p>
                <p className="td">{data.lastName}</p>
              </div>
              <div className="table-data">
                <p className="th">Address</p>
                <p className="td">{data.address}</p>
              </div>
              <div className="table-data">
                <p className="th">Company</p>
                <p className="td">{data.company}</p>
              </div>
              <div className="table-data">
                <p className="th">Webiste URL</p>
                <p className="td">{data.websiteURL}</p>
              </div>
              <div className="table-data">
                <p className="th">Mobile Number</p>
                <p className="td">{data.mobileNumber}</p>
              </div>
              <div className="table-data">
                <p className="th">Contact Created On</p>
                <p className="td">{data.date}</p>
              </div>
              <div className="table-data">
                <p className="th">Contact Department</p>
                <p className="td">{data.contactDepartment}</p>
              </div>
              <div className="table-data">
                <p className="th">Contact Destination</p>
                <p className="td">{data.contactDestination}</p>
              </div>
              <div className="table-data">
                <p className="th">Source</p>
                <p className="td">{data.otherSourcetype==='' ? data.source : data.otherSourcetype}</p>
              </div>
              <div className="table-data">
                <p className="th">Life Cycle Stage</p>
                <p className="td">{data.lifeCycleStage}</p>
              </div>
              <div className="table-data">
                <p className="th">Life Cycle Stage Date</p>
                <p className="td">{data.stageDate}</p>
              </div>
            </div>
          </div>
    </div>
  )
}

export default SalesPersonContactDetails