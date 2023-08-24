import React,{useState,useEffect,useRef} from 'react'
import {RiLogoutCircleRLine} from 'react-icons/ri'
import {IoIosContact} from 'react-icons/io'
import {useNavigate} from 'react-router-dom'
import api from './../util/api'
import { GiHamburgerMenu } from "react-icons/gi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import logo from './kloc-white-logo.png'
import './index.css'
import UserModule from './UserModule'
import AllContacts from './AllContacts';
import AllTasks from './AllTasks'
import AllOffering from './AllOffering'
import AllSalesPersons from './AllSalesPersons'
import AllNotifications from './AllNotifications'
import AllOpportunities from './AllOpportunities';
import UpdateProfile from './UpdateProfile';
import AllCustomers from './AllCustomers';

const activeClassName = "activeTab";
function Dashboard() {
  const dropRef=useRef()
  const [cursor, setCursor] = useState('default');
  const [proData,setProData]=useState([])
  const [profile,setProfile]=useState(false)
  const [isdash,setIsDash]=useState(false)
  const [isDashboard, setIsDashboard] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isSalesPerson,setIsSalesPerson]=useState(false)
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
    // const handleDashboard = () => {
    //   setIsDashboard(true)
    //   setIsUser(false)
    //   setIsSalesPerson(false)
    //   setIsContact(false)
    //   setIsTask(false)
    //   setIsOffering(false)
    //   setIsOpportunity(false)
    //   setIsCustomer(false)
    //   setIsNotification(false)
    //   setIsProfile(false)
    //   setIsPopUpOpen(false);
    //   setActiveTab("dashboard");
    // };
    // const handleUser = () => {
    //   setIsDashboard(false)
    //   setIsUser(true)
    //   setIsSalesPerson(false)
    //   setIsContact(false)
    //   setIsTask(false)
    //   setIsOffering(false)
    //   setIsOpportunity(false)
    //   setIsCustomer(false)
    //   setIsNotification(false)
    //   setIsProfile(false)
    //   setIsPopUpOpen(false);
    //   setActiveTab("user");
    // };
    // const handleSalesPerson=()=>{
    //   setIsDashboard(false)
    //   setIsUser(false)
    //   setIsSalesPerson(true)
    //   setIsContact(false)
    //   setIsTask(false)
    //   setIsOffering(false)
    //   setIsOpportunity(false)
    //   setIsCustomer(false)
    //   setIsNotification(false)
    //   setIsProfile(false)
    //   setIsPopUpOpen(false);
    //   setActiveTab("salesPerson");
    // }
    // const handleContact = () => {
    //   setIsDashboard(false)
    //   setIsUser(false)
    //   setIsSalesPerson(false)
    //   setIsContact(true)
    //   setIsTask(false)
    //   setIsOffering(false)
    //   setIsOpportunity(false)
    //   setIsCustomer(false)
    //   setIsNotification(false)
    //   setIsProfile(false)
    //   setIsPopUpOpen(false);
    //   setActiveTab("contact");
    // };
    // const handleTask = () => {
    //   setIsDashboard(false)
    //   setIsUser(false)
    //   setIsSalesPerson(false)
    //   setIsContact(false)
    //   setIsTask(true)
    //   setIsOffering(false)
    //   setIsOpportunity(false)
    //   setIsCustomer(false)
    //   setIsNotification(false)
    //   setIsProfile(false)
    //   setIsPopUpOpen(false);
    //   setActiveTab("task");
    // };
    // const handleOffering = () => {
    //   setIsDashboard(false)
    //   setIsUser(false)
    //   setIsSalesPerson(false)
    //   setIsContact(false)
    //   setIsTask(false)
    //   setIsOffering(true)
    //   setIsOpportunity(false)
    //   setIsCustomer(false)
    //   setIsNotification(false)
    //   setIsProfile(false)
    //   setIsPopUpOpen(false);
    //   setActiveTab("offering");
    // };
    // const handleOpportunity = () => {
    //   setIsDashboard(false)
    //   setIsUser(false)
    //   setIsSalesPerson(false)
    //   setIsContact(false)
    //   setIsTask(false)
    //   setIsOffering(false)
    //   setIsOpportunity(true)
    //   setIsCustomer(false)
    //   setIsNotification(false)
    //   setIsProfile(false)
    //   setIsPopUpOpen(false);
    //   setActiveTab("opportunity");
    // };
    // const handleCustomer = () => {
    //   setIsDashboard(false)
    //   setIsUser(false)
    //   setIsSalesPerson(false)
    //   setIsContact(false)
    //   setIsTask(false)
    //   setIsOffering(false)
    //   setIsOpportunity(false)
    //   setIsCustomer(true)
    //   setIsNotification(false)
    //   setIsProfile(false)
    //   setIsPopUpOpen(false);
    //   setActiveTab("customer");
    // };
    // const handleNotification = () => {
    //   setIsDashboard(false)
    //   setIsUser(false)
    //   setIsSalesPerson(false)
    //   setIsContact(false)
    //   setIsTask(false)
    //   setIsOffering(false)
    //   setIsOpportunity(false)
    //   setIsCustomer(false)
    //   setIsNotification(true)
    //   setIsProfile(false)
    //   setIsPopUpOpen(false);
    //   setActiveTab("notification");
    // };
    // const handleProfile = () => {
    //   setIsDashboard(false)
    //   setIsUser(false)
    //   setIsSalesPerson(false)
    //   setIsContact(false)
    //   setIsTask(false)
    //   setIsOffering(false)
    //   setIsOpportunity(false)
    //   setIsCustomer(false)
    //   setIsNotification(false)
    //   setIsProfile(true)
    //   setIsPopUpOpen(false);
    //   setActiveTab("profile");
    // };

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
                >Dashboard Metrics</p>
              <p className={
                  activeTab === "user"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={()=>navigate('/allUsers')}>User</p>
                <p className={
                  activeTab === "salesPerson"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={()=>navigate('/allSalesPersons')}>SalesPerson</p>
              <p onClick={()=>navigate('/allContacts')} className={
                  activeTab === "contact"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                >Contact</p>
              <p onClick={()=>navigate('/allTasks')} className={
                  activeTab === "task"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                >Task</p>
              <p onClick={()=>navigate('/allOfferings')} className={
                  activeTab === "offering"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                >Offering</p>
              <p className={
                  activeTab === "opportunity"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                onClick={()=>navigate('/allOpportunities')}>Opportunity</p>
              <p onClick={()=>navigate('/allNotifications')} className={
                  activeTab === "notification"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                >Notification</p>
              <p onClick={()=>navigate('/allCustomers')} className={
                  activeTab === "customer"
                    ? `${activeClassName} `
                    : "desktop-header-navbar-link"
                }
                >Customer</p>
              {/* <p className='desktop-header-navbar-link' >Logout</p> */}
              <p onClick={()=>navigate('/profileModule',{state:profileData})} className={
                  activeTab === "profile"
                    ? `${activeClassName}`
                    : "desktop-header-navbar-link"
                }><IoIosContact  size={20}/></p>
                <p onClick={handleLogout} className={
                  activeTab === "logout"
                    ? `${activeClassName}`
                    : "desktop-header-navbar-link"
                }><RiLogoutCircleRLine  size={20}/></p>
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
                  <li className="header-navbar-link" >Dashboard Metrics</li>
                  <li className="header-navbar-link" onClick={() => navigate('/allUsers')}>User</li>
                  <li className="header-navbar-link" onClick={()=>navigate('/allSalesPersons')}>SalesPerson</li>
                  <li className="header-navbar-link" onClick={()=>navigate('/allContacts')}>Contact</li>
                  <li className="header-navbar-link" onClick={()=>navigate('/allTasks')}>Task</li>
                  <li className="header-navbar-link" onClick={()=>navigate('/allOfferings')}>Offering</li>
                  <li className="header-navbar-link" onClick={()=>navigate('/allOpportunities')}>Opportunity</li>
                  <li className="header-navbar-link" onClick={()=>navigate('/allNotifications')}>Notification</li>
                  <li className="header-navbar-link" onClick={()=>navigate('/allCustomers')}>Customer</li>
                  <li className="header-navbar-link" onClick={()=>navigate('/profileModule',{state:profileData})}>Profile</li>
                  <li className="header-navbar-link" onClick={handleLogout}>Logout</li>
                </ul>
              </Popup>
            </div>
      </div>
      )}
    </div>
  )
}

export default Dashboard