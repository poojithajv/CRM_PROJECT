import React ,{useState,useEffect}from 'react'
import api from '../../../util/api'
import { Card } from 'react-bootstrap';
import './Report.css'
const SalesPersonReport  = () =>{
    const currentDate = new Date();
    const year1 = currentDate.getFullYear();
    const month1= currentDate.getMonth();
    const formattedFirstDay = `${year1}-${(month1 + 1).toString().padStart(2, '0')}-01`;
    const year2 = currentDate.getFullYear();
    const month2 = currentDate.getMonth()
    const currentDayOfMonth = new Date();
    const formattedLastDay = `${year2}-${(month2 + 1).toString().padStart(2, '0')}-${currentDayOfMonth.getDate().toString().padStart(2, '0')}`;
    const [startDate, setStartDate] = useState(formattedFirstDay);
    const [endDate, setEndDate] = useState(formattedLastDay );
    const [Task,SetTasks] =  useState([])
    const [salesPerson ,SetsalesPerson]  = useState([])
    const [salesPersonIdData,SetSalespersonsIdData] =  useState([])
    const [sales,setSales]  = useState("")
    const [isFilter,setIsFilter]=useState(false)
    // handleFilter function used to filter the all tests data responses using start date and end date
    useEffect(()=>{
     var salespersonurl = '/app/getAllSalesPerson'
       api.get(salespersonurl)
       .then(responseJson => {
          SetsalesPerson(responseJson.data)
          console.log(responseJson.data)
        })
        .catch(error => ({
        }));
    },[])
    const handleFilter =  () => {
      setIsFilter(true)
      api.get(`app/getSalesPerson/${sales}`)
      .then((res)=>{
        SetSalespersonsIdData(res.data?.user?.userName)
      })
      var url  =  `/task/getAllTaskByDateRangeBySalesperson/${startDate}/${endDate}/${sales}`
      console.log(url)
      api.get(url)
      .then(responseJson => {
          SetTasks(responseJson.data)
          console.log(responseJson.data)
       })
       .catch(error => ({
       }));
    }
    const salesPersonDetails=salesPerson.map((item,index)=>[item?.salespersonId,item?.user.userName])
    const contacts =  Task.filter((item,index)=>!item?.taskDescription?.startsWith("Transferred as"))
    const customers = Task.filter((item,index)=>item?.contactId?.lifeCycleStage?.statusValue?.toLowerCase()==="won").length
  return (
    <div>
        <div style={{marginTop:'20px'}} className='test-report-date-filter'>
          <div className='test-report-display-between'>
            Start Date:{"   "}
            <input
              type='date'
              value={startDate}
              className='test-report-date-input'
              style={{ marginLeft: "10px" }}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className='test-report-display-between'>
            End Date:{" "}
            <input
              type='date'
              value={endDate}
              className='test-report-date-input'
              style={{ marginLeft: "10px" }}
              // max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className='test-report-display-between'>
            <select value={sales}  onChange={(e)=>{setSales(e.target.value)
            setIsFilter(false)}} class="form-control">
              <option value="" >SalesPersonId</option>
              {salesPersonDetails.map((item,index) =><option value={item[0]}>{item[0]} -- {item[1]}</option>)}
            </select>
          </div>
          <button
            style={{
              padding: "3px",
              width: "60px",
              backgroundColor: "#004461",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "5px",
              marginLeft:"5px"
            }}
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
        {endDate < startDate && endDate && <p className="error">End Date Should Be Greater Than Start Date</p>}
        <div style={{display:'flex',alignItems:'center', justifyContent :'center',padding:"10px"}}>
          {isFilter && (
            <Card className='report-card'>
              <div className="table-data1">
              <p className="th">Name</p>
              <p className="td">{salesPersonIdData}</p>
            </div>
            <div className="table-data1">
              <p className="th">No of Contacts</p>
              <p className="td">{contacts?.length}</p>
            </div>
            <div className="table-data1">
              <p className="th">No of customers</p>
              <p className="td">{customers}</p>
            </div>
            </Card>
          )}
          
        </div>
      </div>
  )
}
export default SalesPersonReport