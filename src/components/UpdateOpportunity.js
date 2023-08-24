import React, { useState, useEffect } from 'react'
import api from '../util/api'
import toast from 'react-hot-toast'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

const initialOpportunity = { opportunityName: '', opportunitySize: '' }
function UpdateOpportunity() {
  const dat=JSON.parse(localStorage.getItem('oppRow'))
  const [contactId, setContactId] = useState(null)
  const [offeringId, setOfferingId] = useState(null)
  const [opportunity, setOpportunity] = useState(initialOpportunity)
 
  const opportunityHandler = (e) => {
    const { name, value } = e.target
    setOpportunity({ ...opportunity, [name]: value })
  }

  const clearHandler = () => {
    if (window.confirm('Are you sure to clear fields?')) {
      setOpportunity(initialOpportunity)
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      api.put(`/app/${dat?.opportunityId}/${contactId}/${offeringId}`, opportunity)
        .then(res => {
          // console.log(res.data);
          toast.success('Opportunity details updated successfully')
          window.location.reload()
          setOpportunity(initialOpportunity)
        }).catch(err => console.log(err))
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    try {
      const initialFetch = async () => {
        api.get(`/app/${dat.opportunityId}`)
          .then(res => {
            // console.log(res.data);
            setContactId(res.data.contact.contactId)
            setOfferingId(res.data.offering.offeringId)
            const { opportunityName, opportunitySize } = res.data
            setOpportunity({ ...opportunity, opportunityName, opportunitySize })
          }).catch(err => console.log(err))
      }
      initialFetch()
    } catch (error) {
      console.log(error.message);
    }
  }, [])
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-3">
            <div className="card-header">
              <h2 className="text-info">Update Opportunity</h2>
            </div>
            <div className="card-body pt-0">
              {/* {isLoading && <h3 >Loading... <i className="fa-solid fa-spinner fa-spin-pulse"></i></h3>} */}
              <form onSubmit={submitHandler}>
                <div className="form-group mt-3">
                  <label htmlFor="opportunityName">Opportunity Name <span className='required'>*</span></label>
                  <input type="text" name="opportunityName" id="opportunityName" value={opportunity.opportunityName} onChange={opportunityHandler} className='form-control' required />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="opportunitySize">Opportunity Size <span className='required'>*</span></label>
                  <input type="text" name="opportunitySize" id="opportunitySize" value={opportunity.opportunitySize} onChange={opportunityHandler} className='form-control' required />
                </div>
                <div className="input-group mt-4 d-flex justify-content-center">
                <button type="submit" style={{marginRight:'20px',marginBottom:'10px',width:'80px'}}>Update</button>
                  <button type="button" onClick={clearHandler} style={{marginRight:'20px',marginBottom:'10px',width:'80px'}}>Clear</button>
                  <button onClick={()=>window.location.reload()} style={{marginRight:'20px',marginBottom:'10px',width:'80px'}}>Back</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateOpportunity