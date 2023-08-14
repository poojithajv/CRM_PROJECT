import React, { useState, useEffect } from 'react'
import api from './../util/api'
import toast from 'react-hot-toast';
import { useNavigate, Link,useLocation } from 'react-router-dom';

const EditUser = ({data}) => {
  const [user, setUser] = useState(data)
  console.log(user)
  const [userData,setUserData]=useState({
    userName:user.userName,
    role:{
      statusValue:user.role
    },
    status:{
      statusValue:user.statusValue
    }
  })

  const navigate = useNavigate()

  // function to update user details in state
  const changeHandler = (e) => {
    const { name, value } = e.target
    console.log(name)
    if (name!=='statusValue'){
      setUserData({ ...userData, [name]: value })
    }else if (name==='statusValue'){
      setUserData({ ...userData, status: { ...userData.status, [name]: value } })
    }
  }
  console.log(userData)

  // function to clear all fields
  const clearHandler = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setUser([])
    }
  }

  // function to call user register and sales person register apis
  const submitHandler = async (e) => {
    try {
      e.preventDefault()
      const userResponse = await api.put(`/api/updateUser/${userData.userId}`,userData)
      if (userResponse.status === 200) {
        console.log(userResponse.data);
      }
      const userRes = await api.put(`/api/updateStatus/${userData.userId}/${userData.status.statusValue}`,userData)
      if (userRes.status === 200) {
        console.log(userRes.data);
      }
      toast.success('User Updated successfully')
      navigate('/allUsers')
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <div className="container" style={{width:'90vw'}}>
        <div className="row d-flex justify-content-center">
          <div className="col-10"> 
            <div className="card mt-5">
              <div className="card-header">
                <h2 className='text-info'>Update User </h2>
              </div>
              <p className='text-center'>User ID: {user.userId}</p>
              <div className="card-body mx-5 pt-0">
                <form className='user_form' onSubmit={submitHandler} >
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <div className="form-group">
                        <label htmlFor="userName">User Name <span className='required'>*</span></label>
                        <input type="text" name="userName" id="userName" value={userData.userName} onChange={changeHandler} className='form-control' pattern='[A-Z a-z]{3,}' title="Name should contain alphabets only and minimum three characters" />
                      </div>
                      <div className='form-group mt-3'>
                      <label htmlFor="statusValue">Status <span className='required'>*</span></label>
                        <select value={userData.status.statusValue==='active' || userData.status.statusValue==='Active'  ? 'Active' : 'DeActive'} onChange={changeHandler} name="statusValue" className="form-select" required>
                          <option hidden>{userData.status.statusValue==='active' || userData.status.statusValue==='Active'  ? 'Active' : 'DeActive'}</option>
                          <option value="active">Active</option>
                          <option value="deactive">DeActive</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mt-3" >
                        <label htmlFor="mobileNo">Mobile Number <span className='required'>*</span></label>
                        <input type="text" name="mobileNo" id="mobileNo" value={userData.mobileNo} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' required />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="altMobileNo">Alt Mobile Number</label>
                        <input type="text" name="altMobileNo" id="altMobileNo" value={userData.altMobileNo} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' />
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <div className="input-group d-flex justify-content-center">
                        <button type="submit" className='btn  btn-success'>Submit</button>
                        <button className='btn btn-secondary' style={{marginLeft:'20px'}} onClick={clearHandler}>Clear</button>
                        <button className='btn btn-primary' style={{marginLeft:'20px'}} onClick={()=>navigate('/allUsers')}>Back</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default EditUser