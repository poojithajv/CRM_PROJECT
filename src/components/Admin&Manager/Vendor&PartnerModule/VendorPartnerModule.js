import React,{useState} from 'react'
import Dashboard from '../Header/Dashboard'
import AllVendorsPartners from './AllVendorsPartners'
import CreateVendorPartner from './CreateVendorPartner'
import UpdateVendorPartner from './UpdateVendorPartner'

function VendorPartnerModule() {
    const [isCreateVendorPartner,setIsCreateVendorPartner]=useState(false)
    const [isUpdateVendorPartner,setIsUpdateVendorPartner]=useState(false)
      const handleCreateVendorPartner=()=>{
        setIsCreateVendorPartner(true)
        setIsUpdateVendorPartner(false)
      }
      const handleUpdateVendorPartner=()=>{
        setIsCreateVendorPartner(false)
        setIsUpdateVendorPartner(true)
      }
  return (
    <div>
      <Dashboard />
    <div className='users-container'>
      <div className='buttons'>
        <button style={{backgroundColor:'#1d1a69',height:'60px'}} className='salesPersonbtn' onClick={handleCreateVendorPartner}>Create Vendor/Partner</button>
        <button style={{backgroundColor:'lightgray',color:'#010000',height:'60px'}} className='salesPersonbtn' onClick={handleUpdateVendorPartner}>Update Vendor/Partner</button>
      </div>
    {isCreateVendorPartner===false && isUpdateVendorPartner===false ? (
     <AllVendorsPartners />
     ) : null}
    {isCreateVendorPartner && (
      <CreateVendorPartner />
    )}
    {isUpdateVendorPartner && (
      <UpdateVendorPartner  />
    )}
    </div>
    </div>
  )
}

export default VendorPartnerModule