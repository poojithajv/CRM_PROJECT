import React, { useState , useEffect} from 'react';
import api from './../util/api'
import {useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./index.css"
export default function UpdateOffering  ({offer})  {
    //const {id} = useParams();
    // const location = useLocation();
    // const offer = location.state || {};
    const navigate=useNavigate();
    const parseDate = (date) => {
        if (!date || isNaN(new Date(date))) {
          return new Date().toISOString().split('T')[0]; // Use current date if invalid or not provided
        }
        return new Date(date).toISOString().split('T')[0];
      };
  //console.log(contact)
  const [formData, setFormData] = useState({
    offeringCategory:offer.offeringCategory,
    offeringType : offer.offeringType,
    offeringName : offer.offeringName,
    ctc : offer.ctc,
    projectCost : offer.projectCost,
    actualCost : offer.actualCost,
    costType : offer.costType,
    validTillDate : parseDate(offer.validTillDate)
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("Updating state:", name, value);
    setFormData({ ...formData, [name]: value });
  };
  const handleSendOffer = async(e) => {
    e.preventDefault()
    const updateOffer = {
      id: offer.id,
      offeringCategory: {
        statusValue: formData.offeringCategory,
      },
      offeringType: {
        statusValue: formData.offeringType,
      },
      offeringName : formData.offeringName,
      ctc : formData.ctc,
      projectCost : formData.projectCost,
      actualCost : formData.actualCost,
      costType : formData.costType,
      validTillDate : formData.validTillDate
    };
    console.log("Sending updateOffer:", updateOffer);
    // Make the API call to update the contact details
    try{
        const response=await api.put(`/OfferingController/update_offering_by_offeringId/${offer.offeringId}`,updateOffer)
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
                <h2 className='text-info'>Update Offering</h2>
              </div>
              <div className="card-body mx-5 pt-0">
                <form className='user_form' onSubmit={handleSendOffer}>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <div className="form-group">
                        <label className="form-label" htmlFor="offeringCategory">Offering Category <span className='required'>*</span></label>
                        <select className="form-control"
                            type="text"
                            id="offeringCategory"
                            name="offeringCategory"
                            value={formData.offeringCategory}
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
                                value={formData.offeringType}
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