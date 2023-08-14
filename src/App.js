import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';

import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';

import Dashboard from './components/Dashboard';

import ManagerWiseData from './components/ManagerWiseData';

import Home from './components/Home'
import SalesPersonDashboard from './components/SalesPersonDashboard';


function App() {
  const isauthenticated=()=>{
    const token=localStorage.getItem('token')
    console.log(token)
    return token 
  }
  const isAuthenticated=isauthenticated()
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path='/' element={<Login /> } />
          {/* <Route path='/allUsers' element={isAuthenticated ?<AllUsers /> : <Navigate to='/' />} />
          <Route path='/allContacts' element={isAuthenticated ?<AllContacts /> : <Navigate to='/' />} />
          <Route path='/allTasks' element={isAuthenticated ?<AllTasks /> : <Navigate to='/' />} /> */}
          {/* <Route path='/user_register' element={<UserRegister /> } /> */}
          {/* <Route path='/update_user' element={isAuthenticated ? <EditUser /> : <Navigate to='/' />} /> */}
          <Route path='/managerWiseData' element={isAuthenticated ? <ManagerWiseData /> : <Navigate to='/' />} />
          {/* <Route path='/sales_person' element={isAuthenticated ? <SalesPerson /> : <Navigate to='/' />} />
          <Route path='/opportunity' element={isAuthenticated ? <Opportunity /> : <Navigate to='/' />} /> */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/salesPersonDashboard' element={<SalesPersonDashboard /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
