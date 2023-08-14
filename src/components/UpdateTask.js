import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import toast from "react-hot-toast";
import dayjs from "dayjs"; // Import the Dayjs library
import "./index.css";
const Joy = ({taskId}) => {
  const [ActiveSalesActivity, setActiveSalesActivity] = useState("");
  const [activeOutCome, setActiveOutCome] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [leadFeedBackDate, setLeadFeedBackDate] = useState("");
  const [leadFeedback, setLeadFeedback] = useState("");
  const [taskFeedBack, setTaskFeedback] = useState("");
  const onclickEditTask = () => {
    const UpdateObject = {
      taskStatus: {
        statusValue: activeStatus,
      },
      taskOutcome: {
        statusValue: activeOutCome,
      },
      followUpDate: followUpDate.format("YYYY-MM-DD"),
      taskFeedback: taskFeedBack,
      leadFeedback: leadFeedback,
      feedbackDate: leadFeedBackDate.format("YYYY-MM-DD"),
      salesActivity: {
        statusValue: ActiveSalesActivity,
      },
    };
    console.log(UpdateObject);
    const apiUrl = `/task/updateTaskSub/${taskId}`;
    const authToken = localStorage.getItem("token");
    //
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Adding the authentication header
      },
      body: JSON.stringify(UpdateObject),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Task Updated");
        console.log(data);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
  };
  return (
    <div className="edit-task-container">
      <div className="task-card">
        <div className="each-inputs-container">
          <TextField
            style={{ width: "100%" }}
            onChange={(e) => setTaskFeedback(e.target.value)}
            id="taskFeedBack"
            label="taskFeedBack"
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="FollowUp Date"
                value={followUpDate}
                onChange={(date) => setFollowUpDate(date)}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Autocomplete
            // className="add-task-dropdown"
            style={{ width: "100%", margin: "5px" }}
            size="small"
            disablePortal
            id="combo-box-demo0"
            value={activeStatus}
            onChange={(event, newValue) => setActiveStatus(newValue)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={["Open", "OverDue", "Completed", "In Progress"]}
            sx={{ width: 280 }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
          <Autocomplete
            style={{ width: "100%", margin: "5px" }}
            // className="add-task-dropdown"
            size="small"
            disablePortal
            id="combo-box-demo0"
            value={ActiveSalesActivity}
            onChange={(event, newValue) => setActiveSalesActivity(newValue)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={["Chat", "Email", "Sms", "Demo"]}
            sx={{ width: 280 }}
            renderInput={(params) => <TextField {...params} label="Activity" />}
          />
        </div>
        <div className="each-inputs-container">
          <TextField
            style={{ width: "100%" }}
            onChange={(e) => setLeadFeedback(e.target.value)}
            id="leadFeedBack"
            label="LeadFeedback"
            variant="outlined"
          />
          <LocalizationProvider
            className="each-inputs-container"
            dateAdapter={AdapterDayjs}
          >
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                style={{ width: "300px" }}
                label="Feedback Date"
                value={leadFeedBackDate}
                onChange={(date) => setLeadFeedBackDate(date)}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Autocomplete
            style={{ width: "100%", margin: "5px" }}
            options={[
              "Interested",
              "Left Message",
              "Not Responding",
              "Not Interested",
              "Not able to reach",
              "Postponed",
              "Other",
            ]}
            size="small"
            disablePortal
            id="combo-box-demo0"
            value={activeOutCome}
            onChange={(event, newValue) => setActiveOutCome(newValue)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ width: 280 }}
            renderInput={(params) => <TextField {...params} label="OutCome" />}
          />
          <Button
            variant="outlined"
            style={{ margin: "5px", width: "100%" }}
            onClick={onclickEditTask}
          >
            Edit Task
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Joy;