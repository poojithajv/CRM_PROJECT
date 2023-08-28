import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';

import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';

import Dashboard from './components/Dashboard';

import Home from './components/Home'
import SalesPersonDashboard from './components/SalesPersonDashboard';
import AllSubopportunities from './components/AllSubOpportunities'
import UserModule from './components/UserModule';
import SalesPersonModule from './components/SalesPersonModule'
import ContactModule from './components/ContactModule'
import ProfileModule from './components/ProfileModule';
import AllCustomers from './components/AllCustomers';
import OfferingModule from './components/OfferingModule'
import NotificationModule from './components/NotificationModule'
import SalesPersonInfoModule from './components/SalesPersonInfoModule'
import ContactBySalesPerson from './components/ContactBySalesPerson'
import SalesPersonTasks from './components/SalesPersonTasks';
import TaskModule from './components/TaskModule';
import OpportunityModule from './components/OpportunityModule';
import AdminDashboardMetrics from './components/AdminDashboardMetrics';


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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
