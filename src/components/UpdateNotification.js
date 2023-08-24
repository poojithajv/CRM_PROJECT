import React, { useState,useEffect } from 'react';
import api from './../util/api'
import {useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./index.css"
export default function UpdateNotification  ()  {
  const notification=JSON.parse(localStorage.getItem('notificationRow'))
  const [notificationTemplates,setNotificationTemplates]=useState(null)
  console.log(notification)
    const navigate=useNavigate();
    const parseDate = (date) => {
        if (!date || isNaN(new Date(date))) {
          return new Date().toISOString().split('T')[0]; // Use current date if invalid or not provided
        }
        return new Date(date).toISOString().split('T')[0];
      };
  const [formData, setFormData] = useState({
    notificationType:notification?.notificationType ? notification?.notificationType?.statusValue : "",
   // offeringType : offer.offeringType ? offer.offeringType.statusValue : "",
   notificationTemplate : notification?.notificationTemplate,
   subject : notification?.subject,
   role : notification?.role,
   remindBefore : parseDate(notification?.remindBefore)
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("Updating state:", name, value);
    setFormData({ ...formData, [name]: value });
  };
  const handleSendNotification = async(e) => {
    e.preventDefault()
    const UpdateNotification = {
      id: notification.id,
      notificationType: {
        statusValue: formData.notificationType,
      },
      notificationTemplate : formData.notificationTemplate,
      subject : formData.subject,
      role : formData.role,
      remindBefore : formData.remindBefore
    };
    console.log("Sending UpdateNotification:", UpdateNotification);
    console.log(notification.notificationId)
    // Make the API call to update the contact details
    try{
        const response=await api.put(`/app/notifications/${notification.notificationId}`,UpdateNotification)
        console.log(response)
        if (response.status===200){
            alert('Data Updated Successfully')
            window.location.reload()
        }
        
    }catch (error) {
        console.log(error.message);
      }
  };

  useEffect(() => {
    // Fetch the template list here and update the state
    const getNotificationTemplate = () => {
      const apiUrl = `app/notifications/getalltemplates`;
      const authToken = localStorage.getItem('token')
      fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setNotificationTemplates(result)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
getNotificationTemplate()
}, []);

  const handleClear=()=>{
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setFormData({notificationType:'',notificationTemplate:'',subject:'',role:'',remindBefore:''})
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  return (
    <div>
      <div className="container" >
        <div className="row d-flex justify-content-center">
          <div className="col-12 ">
            <div className="card mt-5" style={{height:'70vh',overflowY:'scroll'}}>
              <div className="card-header">
                <h2 className='text-info'>Update Notification</h2>
              </div>
              <div className="card-body mx-5 pt-0">
                <form className='user_form' onSubmit={handleSendNotification}>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <div className="form-group">
                      <label className="form-label" htmlFor="notificationType">
                            Notification Type<span className='required'>*</span>
                        </label>
                        <select className="form-control"
                            type="text"
                            id="notificationType"
                            name="notificationType"
                            value={formData.notificationType}
                            onChange={handleChange}
                            placeholder="Notification Type" required>
                            <option value={""}>Select option</option>
                            <option value={"OverDueTemplate"}>OverDueTemplate</option>
                            <option value={"followupTemplate"}>followupTemplate</option>
                        </select>
                      </div>
                      <div className="form-group mt-3">
                      <label className="form-label" htmlFor="notificationTemplate">
                            Notification Template<span>*</span>
                                    </label>
                                    <select value={formData.notificationTemplate} className='form-select' name='notificationTemplate' id='notificationTemplate' onChange={handleChange}>
                                      <option value='' hidden>Select</option>
                                      {
                                        notificationTemplates && notificationTemplates.map((notification,index)=>{
                                          return(
                                            <option key={index} value={notification.notificationTemplate
                                            }>{notification.notificationTemplate
                                            }</option>
                                          )
                                        })
                                      }
                                    </select>
                      </div> 
                    </div>
                    <div className="col-md-6 mt-3">
                    <div className="form-group">
                    <label className="form-label" htmlFor="remindBefore">
                            Remind Before<span className='required'>*</span>
                    </label>
                    <input className="form-control"
                    type="date"
                    id="remindBefore"
                    name="remindBefore"
                    value={formData.remindBefore}
                    onChange={handleChange}
                    placeholder="Remind Before" required />
                      </div>
                      <div className="form-group mt-3" >
                      <label className="form-label" htmlFor="subject">
                            Subject <span className='required'>*</span>
                        </label>
                        <input className="form-control"
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject" required />
                      </div> 
                    </div>
                    <div className="col-md-6">
                    <div className="form-group mt-3">
                    <label className="form-label" htmlFor="role">
                        Role<span className='required'>*</span>
                    </label>
                    <select className="form-control"
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Role " required>
                        <option value={""}>Select option</option>
                        <option value={"Sales Person"}>Sales Person</option>
                        <option value={"Manager"}>Manager</option>
                    </select>
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <div className="input-group d-flex justify-content-center">
                        <button type="submit" style={{marginRight:'20px',marginBottom:'10px',width:'80px'}}>Update</button>
                        <button type='button' style={{marginRight:'20px',marginBottom:'10px',width:'80px'}} onClick={handleClear}>Clear</button>
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
  );
};