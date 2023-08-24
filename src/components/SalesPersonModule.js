import { useState,useEffect } from "react"
import Dashboard from './Dashboard';
import AllSalesPersons from './AllSalesPersons'
import UpdateSalesPerson from "./UpdateSalesPerson";


const SalesPersonData = () =>{
    const [issalesPerson,SetisSalesPerson] =  useState(false)
    const [isUpdateSalesPerson,SetUpdateSalesPerson] =  useState(false)
    const handleUpdateSalesperson = () =>{
        SetisSalesPerson(false)
        SetUpdateSalesPerson(true)
    }
   return (
    <div>
    <Dashboard />
    <div className='users-container'>
        <div className='buttons' >
            <button style={{backgroundColor:'#1d1a69'}} className='salesPersonbtn' onClick={handleUpdateSalesperson}>Update SalesPerson</button>
        </div>
        {isUpdateSalesPerson===false && (
            <AllSalesPersons />
        )}
        {isUpdateSalesPerson && (
            <UpdateSalesPerson />
        )}
    </div>
    </div>
    )
}
export default SalesPersonData