import React,{useState,useEffect} from 'react'
import api from './../util/api'
import './index.css'

function TaskLatestStatus(props) {
  const {taskId}=props
  const [data,setData]=useState([])
  useEffect(()=>{
    try{
      const fetchUsers=()=>{
          api.get(`task/getLatestTaskStatusByTaskId/${taskId}`)
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
  console.log(data)
  return (
    <div>
      <div>
      <h1>Task Id: {taskId} Latest Status</h1>
      <div className='statuses-container'>
          <div className='status-container' >
            <h2 className='sub-id'>Task Sub Id: {data.taskSubId}</h2>
            <div>
              <div className="table-data">
                <p className="th">Status Date</p>
                <p className="td">{data.statusDate}</p>
              </div>
              <div className="table-data">
                <p>Feedback Date</p>
                <p className="td">{data.feedbackDate}</p>
              </div>
              <div className="table-data">
                <p>Follow Update</p>
                <p className="td">{data.followUpDate}</p>
              </div>
              <div className="table-data">
                <p>Lead Feedback</p>
                <p className="td">{data.leadFeedback ? data.leadFeedback : 'null'}</p>
              </div>
              <div className="table-data">
                <p>Task Feedback</p>
                <p className="td">{data.taskFeedback}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
    </div>
  )
}

export default TaskLatestStatus