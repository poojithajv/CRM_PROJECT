import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';

import Login from './components/Login/Login';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

import Dashboard from './components/Admin&Manager/Header/Dashboard';
import VendorPartnerModule from './components/Admin&Manager/Vendor&PartnerModule/VendorPartnerModule'

import Home from './components/Home/Home'
import SalesPersonDashboard from './components/SalesPerson/SalesPersonHeader/SalesPersonDashboard'
import AllSubopportunities from './components/Admin&Manager/OpportunityModule/AllSubOpportunities'
import UserModule from './components/Admin&Manager/UserModule/UserModule'
import SalesPersonModule from './components/Admin&Manager/SalesPersonModule/SalesPersonModule'
import ContactModule from './components/Admin&Manager/ContactModule/ContactModule'
import ProfileModule from './components/Admin&Manager/Profile/ProfileModule';
import AllCustomers from './components/Admin&Manager/CustomerModule/AllCustomers'
import OfferingModule from './components/Admin&Manager/OfferingModule/OfferingModule'
import NotificationModule from './components/Admin&Manager/NotificationModule/NotificationModule'
import SalesPersonInfoModule from './components/SalesPerson/InfoModule/SalesPersonInfoModule'
import ContactBySalesPerson from './components/SalesPerson/CreateContact/ContactBySalesPerson'
import SalesPersonTasks from './components/SalesPerson/SalesPersonTasks/SalesPersonTasks'
import TaskModule from './components/Admin&Manager/TaskModule/TaskModule'
import OpportunityModule from './components/Admin&Manager/OpportunityModule/OpportunityModule'
import AdminDashboardMetrics from './components/Admin&Manager/DashboardMetrics/AdminDashboardMetrics'
import SalesPersonDashboardMetrics from './components/SalesPerson/SalesPersonDashboardMetrics/SalesPersonDashboardMetrics'
import Report from './components/Admin&Manager/Report/Report'


function App() {
  const isauthenticated=()=>{
    const token=localStorage.getItem('token')
    console.log(token)
    return token!==undefined
  }
  const isAuthenticated=isauthenticated()
  console.log(isAuthenticated)
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path='/' element={<Login /> } />
          <Route path='/allUsers' element={isAuthenticated ? <UserModule/> : <Navigate to='/' />} />
          <Route path='/allSalesPersons' element={isAuthenticated ? <SalesPersonModule /> : <Navigate to='/' />} />
          <Route path='/allContacts' element={isAuthenticated ?<ContactModule /> : <Navigate to='/' />} />
          <Route path='/allVendorsPartners' element={isAuthenticated ?<VendorPartnerModule /> : <Navigate to='/' />} />
          <Route path='/allCustomers' element={isAuthenticated ? <AllCustomers /> : <Navigate to='/' />} />
          <Route path='/allOpportunities' element={isAuthenticated ? <OpportunityModule /> :<Navigate to='/' />} />
          <Route path='/allSubOpportunities' element={isAuthenticated ? <AllSubopportunities /> :<Navigate to='/' />} />
          <Route path='/profileModule' element={isAuthenticated ? <ProfileModule /> : <Navigate to='/' />}/>
          <Route path='/allOfferings' element={isAuthenticated ? <OfferingModule /> : <Navigate to='/' />} />
          <Route path='/allNotifications' element={isAuthenticated? <NotificationModule /> : <Navigate to='/' />} />
          <Route path='/allTasks' element={isAuthenticated ?<TaskModule /> : <Navigate to='/' />} />  
          <Route path='/salesPersonTasks' element={isAuthenticated ? <SalesPersonTasks /> : <Navigate to='/' /> }/>
          <Route path='/myInfo' element={isAuthenticated ? <SalesPersonInfoModule /> : <Navigate to='/' />} />
          <Route path='/createContact' element={isAuthenticated ? <ContactBySalesPerson /> : <Navigate to='/' />} />
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/salesPersonDashboard' element={isAuthenticated ? <SalesPersonDashboard />  : <Navigate to='/' />} />
          <Route path='/adminDashboardMetrics' element={isAuthenticated ? <AdminDashboardMetrics /> : <Navigate to='/' />} />
          <Route path='/salesPersonDashboardMetrics' element={isAuthenticated ? <SalesPersonDashboardMetrics /> : <Navigate to ='/' />} />
          <Route path='/reports' element={isauthenticated ? <Report /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
