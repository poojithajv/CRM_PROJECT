import React,{useState,useEffect} from 'react'
import { Navbar, Nav } from "react-bootstrap";
import UpdateInfo from './UpdateInfo';
import api from './../util/api'
import './index.css'

function SalesPersonInfo({salesPersonId}) {
  const [data,setData]=useState([])
  const [isAllInfo,setIsAllInfo]=useState(false)
  const [isUpdateInfo,setIsUpdateInfo]=useState(false)
  const [userId,setUserId]=useState('')
  useEffect(()=>{
    try{
      const fetchUsers=()=>{
          api.get(`/app/getSalesPerson/${salesPersonId}`)
          .then(res=>{
              console.log(res)
              setData(res.data)
              setUserId(res.data?.user?.userId)
              console.log(res.data,res.data?.user?.userId)
          }).catch(err => console.log(err.message))
      }
      fetchUsers()
  }
  catch (error) {
      console.log(error.message);
    }
  },[])
  data['userName']=data?.user?.userName
  data['email']=data?.user?.email
  data['mobileNo']=data?.user?.mobileNo
  data['altMobNo']=data?.user?.altMobileNo
  data['role']=data?.user?.authorities[0]?.authority

  const handleAllInfo=()=>{
    setIsAllInfo(true)
    setIsUpdateInfo(false)
  }
  const handleUpdateinfo=()=>{
    setIsAllInfo(false)
    setIsUpdateInfo(true)
  }
  return (
    <div className='sidenav-users-container'>
    <div>
        <Navbar className="flex-column custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link onClick={handleAllInfo}>
              My Info
            </Nav.Link>
            <Nav.Link onClick={handleUpdateinfo} >
              Update Info
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
      {isAllInfo && (
        <div className='info-details'>
        <div className='info-container'>
        <h1 className='head'>SalesPerson Info</h1>
        {/* <button className='info-button'>Edit Info</button> */}
        </div>
          <div className='status-container' >
              <h2 className='heads'>SalesPerson Id : {data.salespersonId}</h2>
                <div className="table-data1">
                  <p className="th">Name</p>
                  <p className="td">{data.userName}</p>
                </div>
                <div className="table-data1">
                  <p className="th">Email</p>
                  <p className="td">{data.email}</p>
                </div>
                <div className="table-data1">
                  <p className="th">Mobile Number</p>
                  <p className="td">{data.mobileNo}</p>
                </div>
                <div className="table-data1">
                  <p className="th">Alternate Mobile Number</p>
                  <p className="td">{data.altMobNo}</p>
                </div>
                <div className="table-data1">
                  <p className="th">Role</p>
                  <p className="td">{data.role}</p>
                </div>
                <div className="table-data1">
                  <p className="th">Target</p>
                  <p className="td">{data.target}</p>
                </div>
                <div className="table-data1">
                  <p className="th">Frequency</p>
                  <p className="td">{data.frequency}</p>
                </div>
                <div className="table-data1">
                  <p className="th">Currency</p>
                  <p className="td">{data.currency}</p>
                </div>
                <div className="table-data1">
                  <p className="th">Amount</p>
                  <p className="td">{data.amount}</p>
                </div>
                <div className="table-data1">
                  <p className="th">Duration</p>
                  <p className="td">{data.duration}</p>
                </div>
          </div>
        </div>
      )}
      {isUpdateInfo && (
        <UpdateInfo userId={userId} salesPersonId={salesPersonId} data={data}/>
      )}
    </div>
  )
}

export default SalesPersonInfo