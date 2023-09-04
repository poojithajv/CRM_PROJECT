import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";
import UpdateInfo from './UpdateInfo';
import SalesPersonInfo from './SalesPersonInfo';
import api from '../../../util/api'
import './Info.css'
import SalesPersonDashboard from '../SalesPersonHeader/SalesPersonDashboard';

function SalesPersonInfoModule() {
    const location=useLocation()
    const [salesPersonId,setSalesPersonId]=useState(location.state)
    console.log(salesPersonId)
  const [data,setData]=useState([])
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

  const handleUpdateInfo=()=>{
    setIsUpdateInfo(true)
  }
  return (
    <div>
        <SalesPersonDashboard />
    <div className='users-container'>
    <div className='buttons'>
    <button style={{backgroundColor:'#1d1a69'}} className='userbtn' onClick={handleUpdateInfo}>Update Profile</button>
    </div>
      {isUpdateInfo===false && (
        <SalesPersonInfo salesPersonId={salesPersonId}/>
      )}
      {isUpdateInfo && (
        <UpdateInfo userId={userId} salesPersonId={salesPersonId} data={data}/>
      )}
    </div>
    </div>
  )
}

export default SalesPersonInfoModule