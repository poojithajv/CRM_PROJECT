import React, { useState , useEffect} from 'react';
import {useLocation} from "react-router-dom"
import "./index.css"
export default function UpdateContact  ({contact})  {
    console.log(contact)
  const [formStatus, setFormStatus] = useState({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      mobileNumber:contact.mobileNumber,
      company:contact.company,
      address:contact.address,
      country:contact.country,
     source: contact.source,
     otherSourcetype: contact.otherSourcetype,
    date: (contact.date),
    stageDate: (contact.stageDate), //parseDate
      websiteURL:contact.websiteURL,
      contactDestination:contact.contactDestination,
      contactDepartment:contact.contactDepartment,
      contactCreatedBy:contact.contactCreatedBy
  });
  const [otherInputVisible, setOtherInputVisible] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState('');
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value === 'Other') {
      setOtherInputVisible(true);
    } else{
      setOtherInputVisible(false);
    }
    const { name, value } = e.target;
    setFormStatus({ ...formStatus, [name]: value });
  };
  const handleOtherInputChange = (event) => {
    setOtherInputValue(event.target.value);
  };
  const handleSendContact = (e) => {
    e.preventDefault();
    const updateContact = {
      contactId: contact.contactId,
      firstName: formStatus.firstName,
      lastName: formStatus.lastName,
      email: formStatus.email,
      mobileNumber: formStatus.mobileNumber,
      company: formStatus.company,
      address: formStatus.address,
      country: formStatus.country,
      date: formStatus.date,
      stageDate: formStatus.stageDate,
      websiteURL: formStatus.websiteURL,
      contactDestination: formStatus.contactDestination,
      contactDepartment: formStatus.contactDepartment,
      source: {
        statusValue: formStatus.source,
      },
      otherSourcetype: formStatus.otherSourcetype,
      contactCreatedBy: {
        userId: formStatus.contactCreatedBy,
      },
    };
console.log(contact.contactId)
    const apiUrl = `/ContactController/update_contact_by_contactId/${contact.contactId}`;
    const authToken = localStorage.getItem('token');
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updateContact),
    })
      .then((response) => response)
      .then((data) => {
        console.log("Contact Updated:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const clearHandler = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
        setFormStatus([])
    }
  }
return (
    <div>
      <div className="container" style={{width:'80vw'}}>
        <div className="row d-flex justify-content-center">
          <div className="col-10"> 
            <div className="card mt-5">
              <div className="card-header">
                <h2 className='text-info'>Update Contact </h2>
              </div>
              <p className='text-center'>Contact ID: {contact.contactId}</p>
              <div className="card-body mx-5 pt-0">
                <form className='user_form' onSubmit={handleSendContact} >
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="firstName">First Name<span>*</span></label>
                        <input className="form-control"type="text" id="firstName" name="firstName"value={formStatus.firstName} onChange={handleChange} placeholder="First Name" required />
                      </div>
                      <div className='form-group mt-3'>
                        <label className="form-label" htmlFor="lastName">Last Name<span>*</span></label>
                        <input className="form-control" type="text" id="lastName" name="lastName" value={formStatus.lastName} onChange={handleChange} placeholder="Last Name" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mt-3">
                            <label className="form-label" htmlFor="email"> Email<span>*</span> </label>
                            <input className="form-control" type="email" id="email" name="email" value={formStatus.email} onChange={handleChange} placeholder="Email" required />
                      </div>
                      <div className="form-group mt-3">
                        <label className="form-label" htmlFor="address">Address<span>*</span></label>
                        <textarea className="form-control" type="address" id="address" name="address" value={formStatus.address} onChange={handleChange} placeholder="Address" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mt-3">
                        <label className="form-label" htmlFor="mobileNumber">Mobile Number<span>*</span></label>
                        <input className="form-control" type="number" id="mobileNumber" name="mobileNumber" value={formStatus.mobileNumber} onChange={handleChange} placeholder="Mobile Number" required />
                      </div>
                      <div className="form-group mt-3">
                            <label className="form-label" htmlFor="contactDestination"> Contact Destination</label>
                            <input className="form-control" type="text" id="contactDestination"  name="contactDestination"  value={formStatus.contactDestination} onChange={handleChange} placeholder="Contact Destination" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mt-3">
                        <label className="form-label" htmlFor="contactCreatedBy"> Contact Created By</label>
                        <input className="form-control" type="text" id="contactCreatedBy" name="contactCreatedBy" value={formStatus.contactCreatedBy} onChange={handleChange} placeholder="Contact Created By" />
                      </div>
                      <div className="form-group mt-3">
                        <label className="form-label" htmlFor="company"> Company<span>*</span> </label>
                        <input className="form-control" type="text" id="company" name="company"  value={formStatus.company} onChange={handleChange} placeholder="Company" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mt-3">
                        <label className="form-label" htmlFor="country"> Country<span>*</span> </label>
                        <input className="form-control" type="text" id="country" name="country" value={formStatus.country} onChange={handleChange} placeholder="Country" required />
                      </div>
                      <div className="form-group mt-3">
                         <label className="form-label" htmlFor="source"> Source<span>*</span></label>
                         <select className="form-control dropdown-toggle bi bi-chevron-down" type="text" id="source" name="source" disabled value={formStatus.source} onChange={(e)=>handleChange(e)} placeholder="Source" required>
                            {/* <i class="bi bi-chevron-down"></i> */}
                            <option value={""}>Select option</option>
                            <option value={"Website"}>Website</option>
                            <option value={"Social Media"}>Social Media</option>
                            <option value={"Advertisements"}>Advertisements</option>
                            <option value={"Other"}>Other</option>
                         </select>
                        {otherInputVisible &&
                                <div>
                                <label className="form-label"  htmlFor="otherInput">Please specify:</label>
                                <textarea
                                    className="form-control"
                                    type="text"
                                    id="otherInput"
                                    value={otherInputValue}
                                    onChange={handleOtherInputChange}
                                />
                                </div>
                            }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mt-3">
                         <label className="form-label" htmlFor="websiteURL"> URL<span>*</span></label>
                         <input className="form-control" type="text" id="websiteURL" name="websiteURL" value={formStatus.websiteURL} onChange={handleChange} placeholder="URL" required />
                      </div>
                      <div className="form-group mt-3">
                         <label className="form-label" htmlFor="date">Date<span>*</span> </label>
                         <input className="form-control" type="date" id="date" name="date" value={formStatus.date} onChange={handleChange} placeholder="Date" disabled />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mt-3">
                        <label className="form-label" htmlFor="stageDate">Stage Date<span>*</span></label>
                        <input className="form-control" type="date" id="stageDate" name="stageDate" value={formStatus.stageDate} onChange={handleChange} placeholder="Stage Date" disabled />
                      </div>
                    </div>
                    <div className='col-md-6'>
                    <div className="form-group mt-3">
                        <label className="form-label" htmlFor="contactDepartment"> Contact Department </label>
                        <input className="form-control" type="text" id="contactDepartment" name="contactDepartment" value={formStatus.contactDepartment}  onChange={handleChange} placeholder="Contact Department" />
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <div className="input-group d-flex justify-content-center">
                        <button type="submit" style={{marginRight:'20px',marginBottom:'10px',width:'80px'}} onClick={handleSendContact}>Update</button>
                        {/* <button style={{marginRight:'20px',marginBottom:'10px',width:'80px'}} onClick={clearHandler}>Clear</button> */}
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