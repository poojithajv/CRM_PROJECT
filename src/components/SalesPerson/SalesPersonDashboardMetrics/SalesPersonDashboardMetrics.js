import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../../../util/api'
import '../../Admin&Manager/DashboardMetrics/Metrics.css'
import SalesPersonDashboard from '../SalesPersonHeader/SalesPersonDashboard'

function SalesPersonDashboardMetrics() {
    const location=useLocation()
    const [salesPersonId,setSalesPersonId]=useState(location.state)
    const currentDate = new Date();
    const year1 = currentDate.getFullYear();
    const month1= currentDate.getMonth();
    const firstDayOfMonth = new Date(year1, month1, 1);
    const formattedFirstDay = `${year1}-${(month1 + 1).toString().padStart(2, '0')}-01`;
    const currentDate1 = new Date()
    const year2 = currentDate.getFullYear();
    const month2 = currentDate.getMonth()
    const currentDayOfMonth = new Date();
    const formattedLastDay = `${year2}-${(month2 + 1).toString().padStart(2, '0')}-${currentDayOfMonth.getDate().toString().padStart(2, '0')}`;
    const[deal,SetDeal]  = useState([])
    const dateObject =  new Date()
    const [opportunities ,setOpportunities] = useState([])
    const [oppSubList, setOppSubList] = useState(null)
    const [years,SetYears] =  useState([])
    const [startDate, setStartDate] = useState(formattedFirstDay);
    const [endDate, setEndDate] = useState(formattedLastDay);
    const [contacts ,SetContacts]   = useState([])
    const [Lost,SetLost]  = useState([])
    const [customers,SetCustomers]  = useState([])
    
  return (
    <div>
        <SalesPersonDashboard />
        <div>
            <h3>SalesPerson Dashboard Metrics</h3>
            <div className="test-report-date-filter">
          <div className="test-report-display-between">
            Start Date:{"   "}
            <input
              type="date"
              value={startDate}
              className="test-report-date-input"
              onChange={(e) => setStartDate(format(new Date(e.target.value),'yyyy-MM-dd'))}
              max={new Date().toISOString().split("T")[0]}
              style={{ marginLeft: "5px" }}
            />
          </div>
          <div className="test-report-display-between">
            End Date:{" "}
            <input
              type="date"
              value={endDate}
              className="test-report-date-input"
              onChange={(e) => setEndDate(format(new Date(e.target.value),'yyyy-MM-dd'))}
              max={new Date().toISOString().split("T")[0]}
              style={{ marginLeft: "5px" }}
            />
          </div>
          <button
            style={{
              padding: "1px",
              width: "60px",
              backgroundColor: "#004461",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Filter
          </button>
        </div>
        {endDate < startDate && endDate && (
          <p className="error">*End Date Should Be Greater Than Start Date</p>
        )}
        </div>
    </div>
  )
}

export default SalesPersonDashboardMetrics