import React,{useState} from 'react';
import api from './../util/api'
import "./index.css";
import { useNavigate } from 'react-router-dom';
const Notification = () => {
    const dat={
        notificationType:{
            statusValue: "",
          },
        notificationTemplate:"",
        remindBefore:"",
        subject:"",
        role:"",
    }
    const [formData,setFormData] = useState(dat);
    const [data,setData] = useState([])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const createNotification = async (newNotification) => {
    try{
    const userResponse = await api.post(`/app/notifications/createnotification`, newNotification)
    console.log(userResponse)
    if (userResponse.status === 201) {
        alert('Notification Created Successfully')
    }
}
    catch (error) {
        console.log(error.message);
      }
  };
//   const getNotificationTemplate = (role, notificationType) => {
//     const apiUrl = `/app/notifications/template/${formData.notificationType}/${formData.role}`;
//     const authToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuYWdlbmRyYXRhbmdldGk0ODQ2QGdtYWlsLmNvbSIsImlhdCI6MTY5MTcyNTEwMywiZXhwIjoxNjkxNzQzMTAzfQ.vnqQf26353LQqObO5MNWuuKoLvA3Jmhx4bkECWVISCYKNB6YcJjtW7LCDYSLSR_fPNcBpw6NqTw3VE9i4GXWPw";
//     fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${authToken}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Notification Template:", data);
//         formData.notificationTemplate=data.notificationTemplate
// console.log(data)
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };
// const handleNotificationSelection = (notification) => {
//   setFormData({
//     notificationType:notification.notificationType ? notification.notificationType.statusValue : "",
//     //offeringType : notification.offeringType ? notification.offeringType.statusValue : "",
//     notificationTemplate : notification.notificationTemplate,
//     remindBefore : notification.remindBefore,
//     subject : notification.subject,
//     role : notification.role,
//   })
// }
const handleSendNotification =()=>{
  const NotificationOnj = {
    notificationType: {
      statusValue: formData.notificationType,
    },
    // offeringType: {
    //   statusValue: formData.offeringType,
    // },
    notificationTemplate: formData.notificationTemplate,
    remindBefore: formData.remindBefore,
    subject: formData.subject,
    role: formData.role,
  };
  createNotification(NotificationOnj)
  console.log(NotificationOnj)
}
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const handleClear=()=>{
    if (window.confirm('Are you sure to clear fields?')) {
    setFormData(dat)
    }
  }
  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-10 ">
            <div className="card mt-5">
              <div className="card-header">
                <h2 className='text-info'>Add Notification</h2>
              </div>
              <div className="card-body mx-5 pt-0">
                <form className='user_form' onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <div className="form-group">
                      <label className="form-label" htmlFor="notificationType">
                            Notification Type<span>*</span>
                        </label>
                        <select className="form-control"
                            type="text"
                            id="notificationType"
                            name="notificationType"
                            value={formData.notificationType}
                            onChange={handleChange}
                            placeholder="Notification Type" required>
                            <option value={""}>Select option</option>
                            <option value={"OverDueTemplate"}>OverDueTemplate</option>
                            <option value={"followupTemplate"}>followupTemplate</option>
                        </select>
                      </div>
                      <div className="form-group mt-3">
                      <label className="form-label" htmlFor="notificationTemplate">
                            Notification Template<span>*</span>
                        </label>
                        <input className="form-control"
                        type="text"
                        id="notificationTemplate"
                        // onClick={getNotificationTemplate}
                        name="notificationTemplate"
                        value={formData.notificationTemplate}
                        onChange={handleChange}
                        placeholder="Notification Template" required />
                      </div> 
                    </div>
                    <div className="col-md-6 mt-3">
                    <div className="form-group">
                    <label className="form-label" htmlFor="remindBefore">
                            Remind Before<span>*</span>
                    </label>
                    <input className="form-control"
                    type="date"
                    id="remindBefore"
                    name="remindBefore"
                    value={formData.remindBefore}
                    onChange={handleChange}
                    placeholder="Remind Before" required />
                      </div>
                      <div className="form-group mt-3" >
                      <label className="form-label" htmlFor="subject">
                            Subject <span>*</span>
                        </label>
                        <input className="form-control"
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject" required />
                      </div> 
                    </div>
                    <div className="col-md-6">
                    <div className="form-group mt-3">
                    <label className="form-label" htmlFor="role">
                        Role<span>*</span>
                    </label>
                    <select className="form-control"
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Role " required>
                        <option value={""}>Select option</option>
                        <option value={"Sales Person"}>Sales Person</option>
                        <option value={"Manager"}>Manager</option>
                    </select>
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <div className="input-group d-flex justify-content-center">
                        <button type="submit" className='btn  btn-success' onClick={handleSendNotification}>Submit</button>
                        <button className='btn btn-secondary' style={{marginLeft:'20px'}} onClick={handleClear}>Clear</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
export default Notification