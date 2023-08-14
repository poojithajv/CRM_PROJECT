import React,{useState,useEffect} from 'react'
import api from './../util/api'
import './index.css'

function AllTaskStatus(props) {
  const {taskId}=props
  const [data,setData]=useState([])
  useEffect(()=>{
    try{
      const fetchUsers=()=>{
          api.get(`/task/getAllTaskStatusByTaskId/${taskId}`)
          .then(res=>{
              setData(res.data)
              console.log(res.data)
          }).catch(err => console.log(err.message))
      }
      fetchUsers()
  }
  catch (error) {
      console.log(error.message);
    }
  },[])
  console.log(data.length)
  return (
    <div>
      <h1>Task Id: {taskId} Status History</h1>
      <div className='statuses-container'>
      {data.length 
        ? data.map((item,index)=>(
          <div className='status-container' key={index}>
            <h2 className='sub-id'>Task Sub Id: {item.taskSubId}</h2>
            <div>
              <div className="table-data">
                <p className="th">Status Date</p>
                <p className="td">{item.statusDate}</p>
              </div>
              <div className="table-data">
                <p>Feedback Date</p>
                <p className="td">{item.feedbackDate}</p>
              </div>
              <div className="table-data">
                <p>Follow Update</p>
                <p className="td">{item.followUpDate}</p>
              </div>
              <div className="table-data">
                <p>Lead Feedback</p>
                <p className="td">{item.leadFeedback ? item.leadFeedback : null}</p>
              </div>
              <div className="table-data">
                <p>Task Feedback</p>
                <p className="td">{item.taskFeedback}</p>
              </div>
            </div>
          </div>
        ))
      : 'No Data Found'}
      </div>
    </div>
  )
}

export default AllTaskStatus