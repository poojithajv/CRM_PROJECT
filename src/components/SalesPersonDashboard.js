import React,{useState,useEffect} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
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
  // const location=useLocation()
  // const [email,setEmail]=useState(location.state)
  const [cursor, setCursor] = useState('default');
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
  const handleDashboard = () => {
    setIsDashboard(true)
    setIsInfo(false)
    setIsAllTasks(false)
    setIsConatctInfo(false)
    setIsCreateContact(false)
    setActiveTab("dashboard");
  };
  const handleInfo = () => {
    setIsDashboard(false)
    setIsInfo(true)
    setIsAllTasks(false)
    setIsConatctInfo(false)
    setIsCreateContact(false)
    setActiveTab("info");
  };
  const handleAllTasks = () => {
    setIsDashboard(false)
    setIsInfo(false)
    setIsAllTasks(true)
    setIsConatctInfo(false)
    setIsCreateContact(false)
    setActiveTab("allTasks");
  };
  const handleContactInfo = () => {
    setIsDashboard(false)
    setIsInfo(false)
    setIsAllTasks(false)
    setIsConatctInfo(true)
    setIsCreateContact(false)
    setActiveTab("contactInfo");
  };
  const handleCreateContact=()=>{
    setIsDashboard(false)
    setIsInfo(false)
    setIsAllTasks(false)
    setIsConatctInfo(false)
    setIsCreateContact(true)
    setActiveTab("createContact");
  }
  return (
    <div onClick={changeCursor} style={{ cursor: cursor }} className='dashboard-container'>
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
                onClick={handleDashboard}>Dashboard Metrics</p>
              <p className={
                  activeTab === "info"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={handleInfo}>My Info</p>
              <p className={
                  activeTab === "allTasks"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={handleAllTasks}>My Tasks</p>
                <p className={
                  activeTab === "createContact"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={handleCreateContact}>Create Contact</p>
              <p className={
                  activeTab === "contactInfo"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={handleContactInfo}>Contact Details</p>
              <p className='desktop-header-navbar-link' onClick={handleLogout}>Logout</p>
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
                  <li className="header-navbar-link" onClick={() => handleDashboard()}>Dashboard Metrics</li>
                  <li className="header-navbar-link" onClick={() => handleInfo()}>My Info</li>
                  <li className="header-navbar-link" onClick={() => handleAllTasks()}>My Tasks</li>
                  <li className="header-navbar-link" onClick={() => handleCreateContact()}>Create Contact</li>
                  <li className="header-navbar-link" onClick={() => handleContactInfo()}>Contact Details</li>
                  <li className="header-navbar-link" onClick={handleLogout}>Logout</li>
                </ul>
              </Popup>
            </div>
      </div>
      {isInfo && (
        <SalesPersonInfo salesPersonId={salesPersonId}/>
      )}
      {isAllTasks && (
        <SalesPersonTasks salesPersonId={salesPersonId}/>
      )}
      {isContactInfo && (
        <SalesPersonContactDetails />
      )}
      {isCreateContact && (
        <CreateContact />
      )}
    </div>
  )
}

export default SalesPersonDashboard