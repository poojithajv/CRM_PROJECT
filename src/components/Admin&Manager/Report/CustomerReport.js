import React,{useState,useEffect} from 'react'
import api from '../../../util/api'
function CustomerReport() {
    const [customersData,setCustomersData]=useState([])
    const [customersList,setCustomersList]=useState([])
    const [opportunityId,setOpportunityId]=useState('')
    const [selectedCustomer,setSelectedCustomer]=useState('')
    const [customer,setCustomer]=useState([])
    const [opportunity,setOpportunity]=useState([])
    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get('/app/getAllCustomers')
                .then(res=>{
                    setCustomersData(res.data)
                    setCustomersList(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
      },[])
    const customerNames=customersList.map(item=>item?.customerId)
    const handleChange=(e)=>{
        const customerId=e.target.value
        try{
            const fetchUsers=()=>{
                api.get(`app/getCustomer/${customerId}`)
                .then(res=>{
                    setOpportunityId(res?.data?.opportunityId)
                    setCustomer(res?.data[0])
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    }

    const handleCustomer=()=>{
        try{
            const fetchUsers=()=>{
                api.get(`/app/${opportunityId}`)
                .then(res=>{
                    setOpportunity(res?.data[0])
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    }
  return (
    <div className='customer-report'>
        <h3>Customer Report</h3>
        <div className='select-container'>
            <select className='select' value={selectedCustomer} onChange={handleChange}>
              <option key='nam'>Select Name</option>
              {customerNames.map((item,index)=>
                <option key={index}>{item}</option>
              )}
            </select>
            <button className='icon' type="button" onClick={handleCustomer}>
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
        {opportunity.length!==0 && (
            <div className='customer-card-container'>
            <div>
                <p>Customer Name</p>
                <p>{customer?.customerId}</p>
            </div>
            <div>
                <p>Opportunity Name</p>
                <p>{opportunity?.opportunityName}</p>
            </div>
            <div>
                <p>Opportunity Size</p>
                <p>{opportunity?.opportunitySize}</p>
            </div>
        </div>
        )}
    </div>
  )
}

export default CustomerReport