import React,{useEffect, useState} from 'react'
import Dashboard from '../Header/Dashboard';
import { format } from 'date-fns';
import api from '../../../util/api'
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
const COLORS = ["#8884D8", "#82CA9D", "#AF19FF", "#FF8042", "#FFBB28"];
function AdminDashboardMetrics() {
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
    const [churnedContacts,SetChurnedContacts] =  useState([])


    console.log(startDate,endDate)
    // handleFilter function used to filter the all tests data responses using start date and end date
    useEffect(()=>{
      var url  =  `/app/getAllOpportuntiesByDate/${startDate}/${endDate}/opportunity`
      var urldeal =  `/app/getAllOpportuntiesByDate/${startDate}/${endDate}/deal`
      var contactsurl =  `/ContactController/get_all_contact_in_date_range/${startDate}/${endDate}`
      var losturl =  `/ContactController/get_all_contact_in_date_range_with_status_type_and_status_value/${startDate}/${endDate}/sales qualified/lost`
      var churedurl =  `/ContactController/get_all_contact_in_date_range_with_status_type_and_status_value/${startDate}/${endDate}/customer/churned`
      var  customerurl = `/ContactController/get_all_contact_in_date_range_with_status_type_and_status_value/${startDate}/${endDate}/customer/won`
      api.get(url)
      .then(responseJson => {
          setOpportunities(responseJson.data)
       })
       .catch(error => ({
       }));
       api.get(churedurl, {
      }).then(responseJson => {
        console.log(responseJson.data)
        SetChurnedContacts(responseJson.data)
      }).catch(error => ({
      }));
          api.get(urldeal).then(responseJson => {
          console.log(responseJson.data)
          SetDeal(responseJson.data)
        }).catch(error => ({
        }));
        api.get(contactsurl).then(responseJson => {
        console.log(responseJson.data)
        SetContacts(responseJson.data)
      }).catch(error => ({
      }));
      api.get(losturl).then(responseJson => {
        console.log(responseJson.data)
        SetLost(responseJson.data)
      }).catch(error => ({
      }));
      api.get(customerurl).then(responseJson => {
      console.log(responseJson.data)
      SetCustomers(responseJson.data)
    }).catch(error => ({
    }));
    },[])
    const handleFilter =  () => {
      var url  =  `/app/getAllOpportuntiesByDate/${startDate}/${endDate}/opportunity`
      var urldeal =  `/app/getAllOpportuntiesByDate/${startDate}/${endDate}/deal`
      var losturl =  `/ContactController/get_all_contact_in_date_range_with_status_type_and_status_value/${startDate}/${endDate}/sales qualified/lost`
      var churedurl =  `/ContactController/get_all_contact_in_date_range_with_status_type_and_status_value/${startDate}/${endDate}/customer/churned`
      var  customerurl = `/ContactController/get_all_contact_in_date_range_with_status_type_and_status_value/${startDate}/${endDate}/customer/won`
      var contactsurl =  `/ContactController/get_all_contact_in_date_range/${startDate}/${endDate}`
      api.get(url).then(responseJson => {
          setOpportunities(responseJson.data)
          }).catch(error => ({
          }));
          api.get(churedurl, {
          }).then(responseJson => {
            console.log(responseJson.data)
            SetChurnedContacts(responseJson.data)
          }).catch(error => ({
          }));
          api.get(urldeal).then(responseJson => {
          console.log(responseJson.data)
          SetDeal(responseJson.data)
        }).catch(error => ({
        }));
        api.get(losturl).then(responseJson => {
        console.log(responseJson.data)
        SetLost(responseJson.data)
      }).catch(error => ({
      }));
      api.get(customerurl).then(responseJson => {
      SetCustomers(responseJson.data)
    }).catch(error => ({
    }));
    api.get(contactsurl).then(responseJson => {
      console.log(responseJson)
    SetContacts(responseJson.data)
  }).catch(error => ({
  }));
    }
      // const opordata =  oppSubList?.filter((item,index)=>item.status.statusValue ==="Opportunity" ? opportunities.push(item.status.statusValue):"")
      // const yeardata = oppSubList?.filter((item,index)=>item.status.statusValue ==="Opportunity" ? years.push(item.status.statusValue,item.opportunityCreatedDate):"")
        // const yearsData = ([...new Set(years)])
        // const year = yearsData[1];
      const opor =  opportunities.length
        const deals =  deal.length
        let sum = 0,sumDeal=0
        const agr =  opportunities.map((item,index)=> sum += item.opportunitySize)
        const ab=deal.map((item,index)=>sumDeal+=item.opportunitySize)
        const inprogress =  contacts.length - (Lost.length + churnedContacts.length + customers.length)

      const BarchartData = [
        {
          name: "Opportunity",
          value: opor,
        },
        {
          name: "Deal",
          value:deals,
        },
        {
          name:"opportunitySize",
          value:sum
        },
        {
          name:"DealSize",
          value:sumDeal
        }
      ];
      const BarchartData1 = [
        {
          name: "contacts",
          value: contacts.length,
        },
        {
          name: "LostContacts",
          value:Lost.length+churnedContacts.length,
        },
        {
          name:"Customers",
          value:customers.length
        },
        {
          name:"InProgress",
          value:inprogress
        }
      ];
  return (
    <div>
        <Dashboard />
        <div className='dash-container'>
        <h3 className='dash-heading'>Dashboard Metrics</h3>
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
            <p>Opportunity/Deals</p>
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
        <div className='barchart'>
                <p>Contacts/Customers/Lost</p>
                <div className='desktop-container'>
                <BarChart
                  width={390}
                  height={300}
                  data={BarchartData1}
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
                  data={BarchartData1}
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
                  data={BarchartData1}
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

export default AdminDashboardMetrics