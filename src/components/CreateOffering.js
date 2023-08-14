import React, { useState , useEffect } from 'react';
import "./index.css";
import { useNavigate } from 'react-router-dom';
//import axios from "axios";
const Offering = () => {
    let dat={
        offeringCategory: {
          statusValue: "",
        },
        offeringType: {
          statusValue: "",
        },
        offeringName: "",
        ctc:"",
        projectCost: "",
        actualCost: "",
        costType: "",
        validTillDate:""
      }
  const [formData, setFormData] = useState(dat);
  //const [offeringId, setOfferingId] = useState(null);
  const [data,setData] = useState([])
  const navigate=useNavigate();
  // Step 1: State variable for the offering ID
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const createOffer = (newOffer) => {
    //console.log(newOffer);
    const apiUrl = "OfferingController/create_offering";
    let token=localStorage.getItem('token')
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newOffer),
    })
      .then((response) => {
      if (response.status===200){
        alert('User registered successfully')
    }})
      .then((data) => {
        
        console.log("Response:", data);
        setData(dat);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
// const handleOfferSelection = (offer) => {
//   setFormData({
//     offeringCategory:offer.offeringCategory ? offer.offeringCategory.statusValue : "",
//     offeringType : offer.offeringType ? offer.offeringType.statusValue : "",
//     offeringName : offer.offeringName,
//     ctc : offer.ctc,
//     projectCost : offer.projectCost,
//     actualCost : offer.actualCost,
//     costType : offer.costType,
//     validTillDate : offer.validTillDate
//   })
// }
const handleSendOffer =()=>{
  const offeringObj = {
    offeringCategory: {
      statusValue: formData.offeringCategory,
    },
    offeringType: {
      statusValue: formData.offeringType,
    },
    offeringName: formData.offeringName,
    ctc: formData.ctc,
    projectCost: formData.projectCost,
    actualCost: formData.actualCost,
    costType: formData.costType,
    validTillDate: formData.validTillDate,
  };
  createOffer(offeringObj)
  console.log(offeringObj)
}
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleClear=()=>{
    if (window.confirm('Are you sure to clear fields?')) {
    setFormData(dat)
    }
  }
  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-10 ">
            <div className="card mt-5">
              <div className="card-header">
                <h2 className='text-info'>Add Offering</h2>
              </div>
              <div className="card-body mx-5 pt-0">
                <form className='user_form' onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="offeringCategory">Offering Category <span className='required'>*</span></label>
                        <select className="form-control"
                            type="text"
                            id="offeringCategory"
                            name="offeringCategory"
                            value={formData.offeringCategory.statusValue}
                            onChange={handleChange}
                            placeholder="Offering Category" required>
                            <option value={""}>Select option</option>
                            <option value={"Variable Bid Project"}>Variable Bid Project</option>
                            <option value={"Fixed Bid Project"}>Fixed Bid Project</option>
                        </select>
                      </div>
                      <div className="form-group mt-3">
                      <label className="form-label" htmlFor="offeringName">
                        Offering Name<span>*</span>
                      </label>
                      <input className="form-control"
                        type="text"
                        id="offeringName"
                        name="offeringName"
                        value={formData.offeringName}
                        onChange={handleChange}
                        placeholder="Offering Name" required />
                      </div> 
                    </div>
                    <div className="col-md-6 mt-3">
                    <div className="form-group">
                      <label className="form-label" htmlFor="projectCost">
                        Project Cost<span>*</span>
                     </label>
                        <input className="form-control"
                        type="number"
                        id="projectCost"
                        name="projectCost"
                        value={formData.projectCost}
                        onChange={handleChange}
                        placeholder="Project Cost" required />
                      </div>
                      <div className="form-group mt-3" >
                      <label className="form-label" htmlFor="validTillDate">
                        Valid Till Date<span>*</span>
                        </label>
                        <input className="form-control"
                        type="date"
                        id="validTillDate"
                        name="validTillDate"
                        value={formData.validTillDate}
                        onChange={handleChange}
                        placeholder="Valid Till Date" required />
                      </div>
                      
                    </div>
                    <div className="col-md-6">
                    <div className="form-group mt-3">
                      <label className="form-label" htmlFor="actualCost">
                        Actual Cost<span>*</span>
                        </label>
                        <input className="form-control"
                        type="number"
                        id="actualCost"
                        name="actualCost"
                        value={formData.actualCost}
                        onChange={handleChange}
                        placeholder="Actual Cost" required />
                      </div>
                      <div className="form-group mt-3">
                      <label className="form-label" htmlFor="ctc">
                        CTC<span>*</span>
                        </label>
                        <input className="form-control"
                        type="number"
                        id="ctc"
                        name="ctc"
                        value={formData.ctc}
                        onChange={handleChange}
                        placeholder="CTC" required/>
                      </div>
                      
                    </div>
                    <div className='col-md-6'>
                    <div className="form-group mt-3">
                      <label className="form-label" htmlFor="costType">
                        Cost Type<span>*</span>
                        </label>
                        <select className="form-control"
                        type="text"
                        id="costType"
                        name="costType"
                        value={formData.costType}
                        onChange={handleChange}
                        placeholder="Cost Type" required>
                        <option value={""}>Select Cost Type</option>
                        <option value={"INR"}>INR</option>
                        <option value={"Dollar"}>Dollar</option>
                        </select>
                      </div>
                      <div className="form-group mt-3">
                      <label className="form-label" htmlFor="offeringType">Offering Type</label>
                        <select className="form-control"
                                type="text"
                                id="offeringType"
                                name="offeringType"
                                value={formData.offeringType.statusValue}
                                onChange={handleChange}
                                placeholder="offering Type" required>
                                <option value={""}>Select option</option>
                                <option value={"Product"}>Product</option>
                                <option value={"Service"}>Service</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <div className="input-group d-flex justify-content-center">
                        <button type="submit" className='btn  btn-success' onClick={handleSendOffer}>Submit</button>
                        <button className='btn btn-secondary' style={{marginLeft:'20px'}} onClick={handleClear}>Clear</button>
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
export default Offering;