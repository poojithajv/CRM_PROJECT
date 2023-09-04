import React,{useState,useEffect} from 'react'
import { json, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../../../util/api'
import '../../Admin&Manager/DashboardMetrics/Metrics.css'
import {
  BarChart,
  Tooltip,
  Cell,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend
} from "recharts";

import '../../Admin&Manager/DashboardMetrics/Metrics.css'
import SalesPersonDashboard from '../SalesPersonHeader/SalesPersonDashboard'

const COLORS = ["#8884D8", "#82CA9D", "#AF19FF", "#FF8042", "#FFBB28"];

function SalesPersonDashboardMetrics() {
    const location=useLocation()
    const currentDate = new Date();
    const year1 = currentDate.getFullYear();
    const month1= currentDate.getMonth();
    const formattedFirstDay = `${year1}-${(month1 + 1).toString().padStart(2, '0')}-01`;
    const year2 = currentDate.getFullYear();
    const month2 = currentDate.getMonth()
    const currentDayOfMonth = new Date();
    const formattedLastDay = `${year2}-${(month2 + 1).toString().padStart(2, '0')}-${currentDayOfMonth.getDate().toString().padStart(2, '0')}`;
    const [startDate, setStartDate] = useState(formattedFirstDay);
    const [endDate, setEndDate] = useState(formattedLastDay);
    const [Task,SetTasks] =  useState([])
    

    useEffect(()=>{
      var url  =  `/task/getAllTaskByDateRangeBySalesperson/${startDate}/${endDate}/${localStorage.getItem('salesPersonId')}`
      console.log(url)
      api.get(url)
      .then(responseJson => {
          SetTasks(responseJson.data)
          console.log(responseJson.data)
       })
       .catch(error => ({
       }));
    },[])
    const handleFilter =  () => {
      var url  =  `/task/getAllTaskByDateRangeBySalesperson/${startDate}/${endDate}/${localStorage.getItem('salesPersonId')}`
      console.log(url)
      api.get(url)
      .then(responseJson => {
          SetTasks(responseJson.data)
          console.log(responseJson.data)
       })
       .catch(error => ({
       }));
    }

    const contacts =  Task.filter((item,index)=>!item?.taskDescription?.startsWith("Transferred as")).length
    const customers = Task.filter((item,index)=>item?.contactId?.lifeCycleStage?.statusValue?.toLowerCase()==="won").length
    const Lost = Task.filter((item,index)=>item?.contactId?.lifeCycleStage?.statusValue?.toLowerCase()==="lost").length
    const InProgress=contacts-customers-Lost

    const BarchartData = [
      {
        name: "contacts",
        value: contacts,
      },
      {
        name:"Customers",
        value:customers
      },
      {
        name:"Lost",
        value:Lost
      },
      {
        name:"InProgress",
        value:InProgress
      },
    ];
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
            onClick={handleFilter}
          >
            Filter
          </button>
            </div>
            {endDate < startDate && endDate && (
              <p className="error">*End Date Should Be Greater Than Start Date</p>
            )}
            <div className='barchart-container'>
              <div className='barchart'>
                      <p>Contacts/Customers/Lost</p>
                        <div className='desktop-container'>
                        <BarChart
                          width={390}
                          height={300}
                          data={BarchartData}
                          margin={{
                            top: 30,
                            right: 0,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray='3 3' />
                          <Tooltip wrapperStyle={{ top: 0, left: 0 }} />
                          <Bar dataKey='value' fill='green' barSize={30}>
                            {BarchartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                            ))}
                          </Bar>
                          <XAxis
                            dataKey='name'
                            style={{ fontSize: "8px", fontWeight: "bold" }}
                          />
                          <YAxis
                            type='number'
                            style={{ fontSize: "15px", fontWeight: "bold" }}
                            domain={[0, 10]}
                          />
                        </BarChart>
                        </div>
                      <div className='mobile-container'>
                      <BarChart
                        width={330}
                        height={300}
                        data={BarchartData}
                        margin={{
                          top: 30,
                          right: 0,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray='3 3' />
                        <Tooltip wrapperStyle={{ top: 0, left: 0 }} />
                        <Bar dataKey='value' fill='green' barSize={30}>
                          {BarchartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                          ))}
                        </Bar>
                        <XAxis
                          dataKey='name'
                          style={{ fontSize: "8px", fontWeight: "bold" }}
                        />
                        <YAxis
                          type='number'
                          style={{ fontSize: "15px", fontWeight: "bold" }}
                          domain={[0, 10]}
                        />
                      </BarChart>
                      </div>
                      <div className='mobile-sm-container'>
                      <BarChart
                        width={300}
                        height={300}
                        data={BarchartData}
                        margin={{
                          top: 30,
                          right: 0,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray='3 3' />
                        <Tooltip wrapperStyle={{ top: 0, left: 0 }} />
                        <Bar dataKey='value' fill='green' barSize={30}>
                          {BarchartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                          ))}
                        </Bar>
                        <XAxis
                          dataKey='name'
                          style={{ fontSize: "8px", fontWeight: "bold" }}
                        />
                        <YAxis
                          type='number'
                          style={{ fontSize: "15px", fontWeight: "bold" }}
                          domain={[0, 10]}
                        />
                      </BarChart>
                      </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default SalesPersonDashboardMetrics