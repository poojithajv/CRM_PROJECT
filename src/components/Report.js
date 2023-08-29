import React, { useState } from 'react'
import Dashboard from './Dashboard'
import CustomerReport from './CustomerReport'
import SalesPersonReport from './SalesPersonReport'

function Report() {
    const [isCustomerReport,setIsCustomerReport]=useState(false)
    const [isSalesPersonReport,setIsSalesPersonReport]=useState(false)

    const handleIsCustomerReport=()=>{
        setIsCustomerReport(true)
        setIsSalesPersonReport(false)
    }
    const handleIsSalesPersonReport=()=>{
        setIsCustomerReport(false)
        setIsSalesPersonReport(true)
    }
  return (
    <div>
      <Dashboard />
    <div className='users-container'>
      <div className='buttons'>
        <button style={{backgroundColor:'#1d1a69'}} className='salesPersonbtn' onClick={handleIsCustomerReport}>Customer Report</button>
        <button style={{backgroundColor:'lightgray',color:'#010000'}} className='salesPersonbtn' onClick={handleIsSalesPersonReport}>SalesPerson Report</button>
      </div>
      {isCustomerReport && (
        <CustomerReport />
      )}
      {isSalesPersonReport && (
        <SalesPersonReport />
      )}
    </div>
    </div>
  )
}

export default Report