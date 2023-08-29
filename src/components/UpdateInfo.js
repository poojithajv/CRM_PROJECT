import React,{useState} from 'react'
import api from './../util/api'
import toast from 'react-hot-toast';
import './index.css'

function UpdateInfo({userId,data}) {
  console.log(userId,data)
  const [userData,setUserData]=useState({
    userName:data?.user?.userName,
    email:data?.user?.email,
    mobileNo:data?.user?.mobileNo,
    altMobileNo:data?.user?.altMobileNo
  })

  const changeHandler = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const clearHandler=()=>{
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setUserData({userName:'',email:'',mobileNo:'',altMobileNo:''})
    }
  }
  const submitHandler = async (e) => {
    try {
      e.preventDefault()
      const userResponse = await api.put(`/api/updateUser/${userId}`,userData)
      if (userResponse.status === 200) {
        console.log(userResponse.data);
      }
      toast.success('Info Updated successfully')
      window.location.reload()
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <div className="container" >
        <div className="row d-flex justify-content-center">
          <div className="col-12"> 
            <div className="card mt-5" style={{height:'70vh',overflowY:'scroll'}}>
              <div className="card-header">
                <h2 className='text-info update-sales'>Update SalesPerson </h2>
              </div>
              <p className='text-center'>User ID: {userId}</p>
              <div className="card-body mx-5 pt-0">
                <form className='user_form' onSubmit={submitHandler} >
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <div className="form-group">
                        <label className='label' htmlFor="userName">User Name <span className='required'>*</span></label>
                        <input type="text" name="userName" id="userName" value={userData.userName} onChange={changeHandler} className='form-control' pattern='[A-Z a-z]{3,}' title="Name should contain alphabets only and minimum three characters" />
                      </div>
                      <div className='form-group mt-3'>
                      <label className='label' htmlFor="email">Email <span className='required'>*</span></label>
                      <input type="email" name="email" id="email" value={userData.email} onChange={changeHandler} className='form-control' pattern='[a-z0-9._%+\-]+@[a-z0-9\-]+\.(in|com)$' title="Please enter valid email address" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mt-3" >
                        <label className='label' htmlFor="mobileNo">Mobile Number <span className='required'>*</span></label>
                        <input type="text" name="mobileNo" id="mobileNo" value={userData.mobileNo} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' required />
                      </div>
                      <div className="form-group mt-3">
                        <label className='label'  htmlFor="altMobileNo">Alt Mobile Number</label>
                        <input type="text" name="altMobileNo" id="altMobileNo" value={userData.altMobileNo} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' />
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <div className="input-group d-flex justify-content-center">
                        <button type="submit" style={{marginRight:'20px',marginBottom:'10px',width:'80px'}}>Update</button>
                        <button type='button' style={{marginRight:'20px',marginBottom:'10px',width:'80px'}} onClick={clearHandler}>Clear</button>
                        <button style={{marginRight:'20px',marginBottom:'10px',width:'80px'}} onClick={()=>window.location.reload()}>Back</button>
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

export default UpdateInfo