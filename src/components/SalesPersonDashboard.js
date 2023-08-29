import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {RiLogoutCircleRLine} from 'react-icons/ri'
import {IoIosContact} from 'react-icons/io'
import { GiHamburgerMenu } from "react-icons/gi";
import Popup from "reactjs-popup";
import SalesPersonInfo from './SalesPersonInfo';
import SalesPersonTasks from './SalesPersonTasks'
import "reactjs-popup/dist/index.css";
import logo from './kloc-white-logo.png'
import api from './../util/api'
import './index.css'
import SalesPersonContactDetails from './SalesPersonContactDetails';
import CreateContact from './CreateContact';

const activeClassName = "activeTab";
function SalesPersonDashboard() {
  const [cursor, setCursor] = useState('default');
  const [isdash,setIsDash]=useState(false)
  const [isDashboard,setIsDashboard]=useState(false)
  const [isInfo,setIsInfo]=useState(false)
  const [isAllTasks,setIsAllTasks]=useState(false)
  const [isContactInfo,setIsConatctInfo]=useState(false)
  const [isCreateContact,setIsCreateContact]=useState(false)
  const [activeTab, setActiveTab] = useState("");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [salesPersonId,setSalesPersonId]=useState('')
  // console.log(email)

  useEffect(()=>{
  try{
    const fetchUsers=()=>{
      let userEmail=localStorage.getItem('userEmail')
        api.get(`/api/getRoleValueAndReportingTo/${userEmail}`)
      .then(res=>{
        if (res.data.role==='SalesPerson'){
          setIsDash(false)
        }else{
          setIsDash(true)
        }
      }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
catch (error) {
    console.log(error.message);
  }
},[])

  useEffect(()=>{
    try{
      const fetchUsers=()=>{
         let email=localStorage.getItem('userEmail')
          api.get(`/app/getIdByEmail/${email}`)
          .then(res=>{
              console.log(res)
              setSalesPersonId(res.data)
              console.log(res.data)
          }).catch(err => console.log(err.message))
      }
      fetchUsers()
  }
  catch (error) {
      console.log(error.message);
    }
  },[])
  console.log(isdash)
  const navigate=useNavigate()
  const handleLogout=()=>{
      let token=localStorage.getItem('token')
      if (token){
          localStorage.removeItem('token')
          localStorage.removeItem('userEmail')
          navigate('/login')
      }
  }
  const changeCursor = () => {
    setCursor(prevState => {
      return 'default';
    });
  }
  // const handleDashboard = () => {
  //   setIsDashboard(true)
  //   setIsInfo(false)
  //   setIsAllTasks(false)
  //   setIsConatctInfo(false)
  //   setIsCreateContact(false)
  //   setActiveTab("dashboard");
  // };
  // const handleInfo=()=>{
  //   setIsDashboard(false)
  //   setIsInfo(true)
  //   setIsAllTasks(false)
  //   setIsConatctInfo(false)
  //   setIsCreateContact(false)
  //   setActiveTab("info");
  // }
  // const handleAllTasks = () => {
  //   setIsDashboard(false)
  //   setIsAllTasks(true)
  //   setIsConatctInfo(false)
  //   setIsCreateContact(false)
  //   setActiveTab("allTasks");
  // };
  // const handleCreateContact=()=>{
  //   setIsDashboard(false)
  //   setIsInfo(false)
  //   setIsAllTasks(false)
  //   setIsConatctInfo(false)
  //   setIsCreateContact(true)
  //   setActiveTab("createContact");
  // }
  return (
    <div onClick={changeCursor} style={{ cursor: cursor }} className='dashboard-container'>
      {isdash ? (
        <p>You cannot access this page</p>
      ):(
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
            <div className="desktop-header-navbar-container">
              <p className={
                  activeTab === "dashboard"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={() => navigate('/salesPersonDashboardMetrics')}>Dashboard Metrics</p>
              <p className={
                  activeTab === "allTasks"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={()=>navigate('/salesPersonTasks',{state:salesPersonId})}>All Tasks</p>
                <p className={
                  activeTab === "createContact"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={()=>navigate('/createContact')}>Create Contact</p>
                <p className={
                  activeTab === "info"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={()=>navigate('/myInfo',{state:salesPersonId})}><IoIosContact  size={20}/></p>
              <p className='desktop-header-navbar-link' onClick={handleLogout}><RiLogoutCircleRLine  size={20}/></p>
            </div>
            {/* nav header for mobile  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Sign Out */}
            <div className="mobile-header-navbar-container">
              <Popup
                contentStyle={{
                  width: "70%",
                  backgroundColor: "white",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "content",
                  alignItems: "center",
                }}
                trigger={
                  <button className="hamburger-btn">
                    <GiHamburgerMenu onClick={() => setIsPopUpOpen(true)} />
                  </button>
                }
                position="bottom right"
                open={isPopUpOpen}
                onClose={() => setIsPopUpOpen(false)}
              >
                <ul className="mobile-hamburger-menu">
                  <li className="header-navbar-link" onClick={() => navigate('/salesPersonDashboardMetrics')}>Dashboard Metrics</li>
                  <li className="header-navbar-link" onClick={() => navigate('/salesPersonTasks',{state:salesPersonId})}>My Tasks</li>
                  <li className="header-navbar-link" onClick={() => navigate('/createContact')}>Create Contact</li>
                  <li className="header-navbar-link" onClick={() => navigate('/myInfo',{state:salesPersonId})}>Profile</li>
                  <li className="header-navbar-link" onClick={handleLogout}>Logout</li>
                </ul>
              </Popup>
            </div>
      </div>
      )}
    </div>
  )
}

export default SalesPersonDashboard