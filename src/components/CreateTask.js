import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import { Head } from "../Header/header";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import toast from "react-hot-toast";
import "./index.css";
// import TaskHead from "../TaskHead";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs"; // Import the Dayjs library
// ...
const blue = {
  100: "#DAECFF",
  200: "#B6DAFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};
const grey = {
  50: "#F6F8FA",
  100: "#EAEEF2",
  200: "#D0D7DE",
  300: "#AFB8C1",
  400: "#8C959F",
  500: "#6E7781",
  600: "#57606A",
  700: "#424A53",
  800: "#32383F",
  900: "#24292F",
};
const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 24px ${
    theme.palette.mode === "dark" ? blue[900] : blue[100]
  };
  &:hover {
    border-color: ${blue[400]};
  }
  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }
  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
const Createtask = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [allSalesPersons, setAllSalesPersons] = useState([]);
  const [allUser, setAllUsers] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [activeSalesPerson, setActiveSalesPerson] = useState("");
  const [activeOffering, setActiveOffering] = useState("");
  const [activeContact, setActiveContact] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [selectedContact, setSelectedContact] = useState("");
  const [selectedSalesperson, setSelectedSalesPersons] = useState("");
  const [selectedOffering, setSelectedOffering] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [dueDate, setDueDate] = useState(null);
  const getAllUserExceptSalespersons = () => {
    const apiUrl = "/api/getAllUsers";
    const authToken = JSON.parse(localStorage.getItem("jwt"));
    // Replace this with your actual authentication token
    console.log(activeUser);
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Adding the authentication header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredUsers = data.filter((user) => {
          return !user.authorities.some(
            (authority) => authority.authority === "SalesPerson"
          );
        });
        const filteredUser = filteredUsers.filter((user) => {
            return !user.authorities.some(
              (authority) => authority.authority === "Administrator"
            );
          });
        console.log(filteredUser)
        const userNames = filteredUser.map(
          (each) => `${each.userName}-${each.userId.slice(-4)}`
        );
        setAllUsers(userNames);
        console.log(data, "users");
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
  };
  const getAllContacts = () => {
    const apiUrl = "/ContactController/get_all_contact";
    const authToken = JSON.parse(localStorage.getItem("jwt"));
    // Replace this with your actual authentication token
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Adding the authentication header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server here
        const contactNames = data.map(
          (each) => `${each.firstName}-${each.contactId.slice(-5)}`
        );
        console.log(data);
        setAllContacts(contactNames);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
  };
  const getAllSalesPerson = () => {
    const apiUrl = "/app/getAllSalesPerson";
    const authToken = JSON.parse(localStorage.getItem("jwt"));
    // Replace this with your actual authentication token
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Adding the authentication header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "salesPerosonsssssss");
        const salespersons = data.map(
          (each) => `${each.user.userName}-${each.salespersonId}`
        );
        setAllSalesPersons(salespersons);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
  };
  const getAllOffers = () => {
    const apiUrl = "/OfferingController/get_all_offering";
    const authToken = JSON.parse(localStorage.getItem("jwt"));
    // Replace this with your actual authentication token
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Adding the authentication header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server here
        console.log(data, "offering");
        const offerNames = data.map(
          (each) => `${each.offeringName}-${each.offeringId.slice(-5)}`
        );
        setAllOffers(offerNames);
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
      });
  };
  const handleTask = () => {
    getAllSalesPerson();
    getAllUserExceptSalespersons();
    getAllOffers();
    getAllContacts();
  };
  useEffect(() => {
    handleTask();
  }, []);
  useEffect(() => {
    if (activeContact) setSelectedContact(`contact_${activeContact.slice(-5)}`);
    if (activeOffering)
      setSelectedOffering(`offering_${activeOffering.slice(-5)}`);
    if (activeSalesPerson) setSelectedSalesPersons(activeSalesPerson.slice(-7));
  }, [activeContact, activeOffering, activeSalesPerson]);
  console.log(selectedContact, selectedOffering, selectedSalesperson);
  const onclickAddTask = () => {
    const taskBody = {
      taskDescription: taskContent,
      startDate: startDate.format("YYYY-MM-DD"), // Format the start date
      dueDate: dueDate ? dueDate.format("YYYY-MM-DD") : null, // Format the due date if it exists, otherwise set to null
    };
    console.log(taskBody);
    const apiUrl = `/task/createTask/${selectedSalesperson}/user_${activeUser.slice(
      -4
    )}/${selectedContact}/${selectedOffering}`;
    const authToken = JSON.parse(localStorage.getItem("jwt"));
    // Replace this with your actual authentication token
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Adding the authentication header
      },
      body: JSON.stringify(taskBody),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Task Created");
      })
      .catch((error) => {
        // Handle any error that occurred during the fetch request
        console.log("error bro");
        console.error("Error:", error);
      });
  };
  return (
    <>
      {/* <TaskHead /> */}
      <div className="create-task-main-container">
        <h2 className="Add-task-heading">Add Task</h2>
        <div className="task-dropDown-container">
          <div>
            <Autocomplete
              className="add-task-dropdown"
              size="small"
              disablePortal
              id="combo-box-demo0"
              options={allUser}
              value={activeUser}
              onChange={(event, newValue) => setActiveUser(newValue)}
              // isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Users" />}
            />
            <Autocomplete
              className="add-task-dropdown"
              size="small"
              disablePortal
              id="combo-box-demo"
              options={allSalesPersons}
              value={activeSalesPerson}
              onChange={(event, newValue) => setActiveSalesPerson(newValue)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Sales Person" />
              )}
            />
          </div>
          <div>
            <Autocomplete
              className="add-task-dropdown"
              size="small"
              disablePortal
              id="combo-box-demo2"
              options={allOffers}
              value={activeOffering}
              onChange={(event, newValue) => setActiveOffering(newValue)}
              sx={{ width: 300 }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} label="Offers" />}
            />
            <Autocomplete
              className="add-task-dropdown"
              size="small"
              disablePortal
              id="combo-box-demo3"
              options={allContacts}
              value={activeContact}
              onChange={(event, newValue) => setActiveContact(newValue)}
              sx={{ width: 300 }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Contact" />
              )}
            />
          </div>
        </div>
        <div className="main-date-fields-container">
          <div className="date-fields-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
                <DatePicker
                  label="Due Date"
                  value={dueDate}
                  onChange={(date) => setDueDate(date)}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </DemoContainer>
            </LocalizationProvider>
            <StyledTextarea
              id="message"
              rows="4"
              cols="50"
              onChange={(e) => setTaskContent(e.target.value)}
              className="task-text-field"
              style={{ width: "100%" }}
              aria-label="empty textarea"
              placeholder="Task description ....."
            />
          </div>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Button variant="contained" onClick={onclickAddTask}>
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Createtask;