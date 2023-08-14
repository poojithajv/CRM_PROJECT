import React, { useState } from 'react';
import api from './../util/api'
import {useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./index.css"
export default function UpdateNotification  ({notification})  {
    const navigate=useNavigate();
    const parseDate = (date) => {
        if (!date || isNaN(new Date(date))) {
          return new Date().toISOString().split('T')[0]; // Use current date if invalid or not provided
        }
        return new Date(date).toISOString().split('T')[0];
      };
  const [formData, setFormData] = useState({
    notificationType:notification.notificationType ? notification.notificationType.statusValue : "",
   // offeringType : offer.offeringType ? offer.offeringType.statusValue : "",
   notificationTemplate : notification.notificationTemplate,
   subject : notification.subject,
   role : notification.role,
   remindBefore : parseDate(notification.remindBefore)
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
        }
        
    }catch (error) {
        console.log(error.message);
      }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-10 ">
            <div className="card mt-5">
              <div className="card-header">
                <h2 className='text-info'>Update Notification</h2>
              </div>
              <div className="card-body mx-5 pt-0">
                <form className='user_form' onSubmit={handleSendNotification}>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <div className="form-group">
                      <label className="form-label" htmlFor="notificationType">
                            Notification Type<span>*</span>
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
                        <input className="form-control"
                        type="text"
                        id="notificationTemplate"
                        // onClick={getNotificationTemplate}
                        name="notificationTemplate"
                        value={formData.notificationTemplate}
                        onChange={handleChange}
                        placeholder="Notification Template" required />
                      </div> 
                    </div>
                    <div className="col-md-6 mt-3">
                    <div className="form-group">
                    <label className="form-label" htmlFor="remindBefore">
                            Remind Before<span>*</span>
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
                            Subject <span>*</span>
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
                        Role<span>*</span>
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
                        <button type="submit" className='btn  btn-success'>Update</button>
                        {/* <button className='btn btn-secondary' style={{marginLeft:'20px'}} onClick={handleClear}>Clear</button> */}
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