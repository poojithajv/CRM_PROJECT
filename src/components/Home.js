import React, { useState,useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import api from './../util/api'
import logo from './kloc-white-logo.png'
import './index.css'

function Home() {
    const navigate=useNavigate()
    const location=useLocation()
    const [email,setEmail]=useState(location.state)
    const [data,setData]=useState([])
    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get(`/api/getRoleValueAndReportingTo/${email}`)
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
    const handleClick=()=>{
      console.log(data.role)
        if (data.role==='SalesPerson'){
            navigate('/salesPersonDashboard',{state:email})
        }else{
            navigate('/dashboard',{state:email})
        }
    }
  return (
    <div>
       <div className="header-container">
            {/* header for desktop  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Sign Out */}
            <div className="nav-container">
              {/* logo */}
              <img
                src={logo}
                alt="logo"
                style={{ height: "120px", width: "120px", marginTop: "10px",marginLeft:'-15px' }}
                onClick={() => navigate("/")}
              />
            </div>
      </div>
      <div className='home-container'>
        <h1>Welcome to Kloc CRM</h1>
        <p>Click here to go to Dashboard</p>
        <button className="button" onClick={handleClick}>Dashboard</button>
        </div>
    </div>
  )
}

export default Home