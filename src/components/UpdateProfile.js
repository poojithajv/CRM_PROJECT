import React,{useState} from 'react'
import api from './../util/api'
import toast from 'react-hot-toast';
import './index.css'

function UpdateProfile({data}) {
    const [dat,setDat]=useState({
        userName:data[0]?.userName,
        email:data[0]?.email,
        mobileNo:data[0]?.mobileNo,
        altMobileNo:data[0]?.altMobileNo
    })

    const changeHandler = (e) => {
      const { name, value } = e.target
      setDat({ ...dat, [name]: value })
    }
    
    const submitHandler = async (e) => {
      try {
        e.preventDefault()
        await api.put(`/api/updateUser/${data[0]?.userId}`,dat)
        .then(res=>{
          console.log(res)
          toast.success('Info Updated successfully')
          // window.location.reload()
        })
        
      } catch (error) {
        console.log(error.message);
      }
    }

    const clearHandler=()=>{
      if (window.confirm('Are you sure you want to clear all fields?')) {
        setDat({userName:'',email:'',mobileNo:'',altMobileNo:''})
      }
    }
    
  return (
    <div className="container" >
    <div className="row d-flex justify-content-center">
      <div className="col-10"> 
        <div className="card mt-5">
          <div className="card-header">
            <h2 className='text-info'>Hii {dat.userName}! Change your profile details here. </h2>
          </div>
          <p className='text-center'>User ID: {data[0]?.userId}</p>
          <div className="card-body mx-5 pt-0">
            <form className='user_form' onSubmit={submitHandler} >
              <div className="row">
                <div className="col-md-6 mt-3">
                  <div className="form-group">
                    <label htmlFor="userName">User Name <span className='required'>*</span></label>
                    <input type="text" name="userName" id="userName" value={dat.userName} onChange={changeHandler} className='form-control' pattern='[A-Z a-z]{3,}' title="Name should contain alphabets only and minimum three characters" />
                  </div>
                  <div className='form-group mt-3'>
                  <label htmlFor="email">Status <span className='required'>*</span></label>
                  <input type="email" name="email" id="email" value={dat.email} onChange={changeHandler} className='form-control' pattern='[a-z0-9._%+\-]+@[a-z0-9\-]+\.(in|com)$' title="Please enter valid email address" required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mt-3" >
                    <label htmlFor="mobileNo">Mobile Number <span className='required'>*</span></label>
                    <input type="text" name="mobileNo" id="mobileNo" value={dat.mobileNo} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' required />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="altMobileNo">Alt Mobile Number</label>
                    <input type="text" name="altMobileNo" id="altMobileNo" value={dat.altMobileNo} onChange={changeHandler} className='form-control' pattern='[6-9]\d{9}' title='Please enter valid mobileNo number' />
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="input-group d-flex justify-content-center">
                    <button type="submit" style={{marginRight:'20px',marginBottom:'10px',width:'80px'}}>Submit</button>
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
  )
}

export default UpdateProfile