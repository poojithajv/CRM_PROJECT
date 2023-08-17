import React,{useState,useEffect,useRef} from 'react'
import {IoIosContact} from 'react-icons/io'
import {useNavigate} from 'react-router-dom'
import api from './../util/api'
import { GiHamburgerMenu } from "react-icons/gi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import logo from './kloc-white-logo.png'
import './index.css'
import AllUsers from './AllUsers';
import EditUser from './EditUser'
import ManagerWiseData from './ManagerWiseData';
import AllContacts from './AllContacts';
import AllTasks from './AllTasks'
import AllOffering from './AllOffering'
import AllNotifications from './AllNotifications'
import SalesPersonDashboard from './SalesPersonDashboard';
import AllOpportunities from './AllOpportunities';
import UpdateProfile from './UpdateProfile';

const activeClassName = "activeTab";
function Dashboard() {
  const dropRef=useRef()
  const [cursor, setCursor] = useState('default');
  const [proData,setProData]=useState([])
  const [profile,setProfile]=useState(false)
  const [isdash,setIsDash]=useState(false)
  const [isDashboard, setIsDashboard] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const [isTask, setIsTask] = useState(false);
  const [isOffering,setIsOffering]=useState(false)
  const [isOpportunity,setIsOpportunity]=useState(false)
  const [isCustomer,setIsCustomer]=useState(false)
  const [isProfile,setIsProfile]=useState(false)
  const [isNotification,setIsNotification]=useState(false)
  const [activeTab, setActiveTab] = useState("");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const navigate=useNavigate()
    const handleLogout=()=>{
        let token=localStorage.getItem('token')
        if (token){
            localStorage.removeItem('token')
            localStorage.removeItem('userEmail')
            navigate('/login')
        }
    }
    useEffect(()=>{
      try{
        const fetchAllUsers=()=>{
          api.get('/api/getAllUsers')
          .then(res=>{
            setProData(res.data)
          }).catch(err => console.log(err.message))
        }
        fetchAllUsers()
      }catch(error){
        console.log(error.message);
      }
    },[])
    useEffect(()=>{
      try{
        const fetchUsers=()=>{
          let userEmail=localStorage.getItem('userEmail')
            api.get(`/api/getRoleValueAndReportingTo/${userEmail}`)
          .then(res=>{
            if (res.data.role==='SalesPerson'){
              setIsDash(true)
            }else{
              setIsDash(false)
            }
          }).catch(err => console.log(err.message))
                }
                fetchUsers()
            }
    catch (error) {
        console.log(error.message);
      }
    },[])
    let profileData=proData.filter(item=>item.email===localStorage.getItem('userEmail'))
    const handleDashboard = () => {
      setIsDashboard(true)
      setIsUser(false)
      setIsContact(false)
      setIsTask(false)
      setIsOffering(false)
      setIsOpportunity(false)
      setIsCustomer(false)
      setIsNotification(false)
      setIsProfile(false)
      setIsPopUpOpen(false);
      setActiveTab("dashboard");
    };
    const handleUser = () => {
      setIsDashboard(false)
      setIsUser(true)
      setIsContact(false)
      setIsTask(false)
      setIsOffering(false)
      setIsOpportunity(false)
      setIsCustomer(false)
      setIsNotification(false)
      setIsProfile(false)
      setIsPopUpOpen(false);
      setActiveTab("user");
    };
    const handleContact = () => {
      setIsDashboard(false)
      setIsUser(false)
      setIsContact(true)
      setIsTask(false)
      setIsOffering(false)
      setIsOpportunity(false)
      setIsCustomer(false)
      setIsNotification(false)
      setIsProfile(false)
      setIsPopUpOpen(false);
      setActiveTab("contact");
    };
    const handleTask = () => {
      setIsDashboard(false)
      setIsUser(false)
      setIsContact(false)
      setIsTask(true)
      setIsOffering(false)
      setIsOpportunity(false)
      setIsCustomer(false)
      setIsNotification(false)
      setIsProfile(false)
      setIsPopUpOpen(false);
      setActiveTab("task");
    };
    const handleOffering = () => {
      setIsDashboard(false)
      setIsUser(false)
      setIsContact(false)
      setIsTask(false)
      setIsOffering(true)
      setIsOpportunity(false)
      setIsCustomer(false)
      setIsNotification(false)
      setIsProfile(false)
      setIsPopUpOpen(false);
      setActiveTab("offering");
    };
    const handleOpportunity = () => {
      setIsDashboard(false)
      setIsUser(false)
      setIsContact(false)
      setIsTask(false)
      setIsOffering(false)
      setIsOpportunity(true)
      setIsCustomer(false)
      setIsNotification(false)
      setIsProfile(false)
      setIsPopUpOpen(false);
      setActiveTab("opportunity");
    };
    const handleCustomer = () => {
      setIsDashboard(false)
      setIsUser(false)
      setIsContact(false)
      setIsTask(false)
      setIsOffering(false)
      setIsOpportunity(false)
      setIsCustomer(true)
      setIsNotification(false)
      setIsProfile(false)
      setIsPopUpOpen(false);
      setActiveTab("customer");
    };
    const handleNotification = () => {
      setIsDashboard(false)
      setIsUser(false)
      setIsContact(false)
      setIsTask(false)
      setIsOffering(false)
      setIsOpportunity(false)
      setIsCustomer(false)
      setIsNotification(true)
      setIsProfile(false)
      setIsPopUpOpen(false);
      setActiveTab("notification");
    };
    const handleProfile = () => {
      setIsDashboard(false)
      setIsUser(false)
      setIsContact(false)
      setIsTask(false)
      setIsOffering(false)
      setIsOpportunity(false)
      setIsCustomer(false)
      setIsNotification(false)
      setIsProfile(true)
      setIsPopUpOpen(false);
      setActiveTab("profile");
    };

    const handleIcon=()=>{
      setProfile(prevState=>!prevState)
    }
    console.log(profile)

    const changeCursor = () => {
      setCursor(prevState => {
        return 'default';
      });
    }
  return (
    <div onClick={changeCursor}
    style={{ cursor: cursor }} className='dashboard-container'>
      {isdash===true ? (
        <p>You cannot access this page</p>
      ): (
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
                  activeTab === "user"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={handleUser}>User</p>
              <p className={
                  activeTab === "contact"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={handleContact}>Contact</p>
              <p className={
                  activeTab === "task"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={handleTask}>Task</p>
              <p className={
                  activeTab === "offering"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={handleOffering}>Offering</p>
              <p className={
                  activeTab === "opportunity"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={handleOpportunity}>Opportunity</p>
              <p className={
                  activeTab === "notification"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={handleNotification}>Notification</p>
              <p className={
                  activeTab === "customer"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={handleCustomer}>Customer</p>
              {/* <p className='desktop-header-navbar-link' >Logout</p> */}
              <p onClick={handleIcon} className={
                  activeTab === "profile"
                    ? `${activeClassName}`
                    : "desktop-header-navbar-link"
                }><IoIosContact  size={20}/></p>
              {profile && (
                <nav className="dropdown" ref={dropRef} onClick={()=>setProfile(!profile)}>
                  <ul>
                    <li onClick={handleProfile} className={activeTab === "profile"? `${activeClassName} `: "desktop-header-list"}>Profile</li>
                    <li className='desktop-header-list' onClick={handleLogout}>Logout</li>
                  </ul>
                </nav>
              )}
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
                  <li className="header-navbar-link" onClick={() => handleUser()}>User</li>
                  <li className="header-navbar-link" onClick={() => handleContact()}>Contact</li>
                  <li className="header-navbar-link" onClick={() => handleTask()}>Task</li>
                  <li className="header-navbar-link" onClick={() => handleOffering()}>Offering</li>
                  <li className="header-navbar-link" onClick={() => handleOpportunity()}>Opportunity</li>
                  <li className="header-navbar-link" onClick={() => handleNotification()}>Notification</li>
                  <li className="header-navbar-link" onClick={() => handleCustomer()}>Customer</li>
                  <li className="header-navbar-link" onClick={handleLogout}>Logout</li>
                </ul>
              </Popup>
            </div>
      </div>
      )}
      
      {/* {isDashboard && <Dashboard />} */}
      {isUser && <AllUsers />}
      {isContact && <AllContacts />}
      {isTask && <AllTasks />}
      {isOffering && <AllOffering />}
      {isNotification && <AllNotifications />}
      {isOpportunity && <AllOpportunities />}
      {isProfile && <UpdateProfile data={profileData}/>}
    </div>
  )
}

export default Dashboard