import React, { useState, useEffect } from 'react'
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import toast from "react-hot-toast";
import { Autocomplete, Card, Radio, TextField } from "@mui/joy";
import Stack from "@mui/joy/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import { Backdrop, CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import {Navigate, json, useNavigate} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import AllTaskStatus from './AllTaskStatus';
import api from './../util/api'
import CreateTask from './CreateTask'
import './index.css'
import TaskLatestStatus from './TaskLatestStatus';
import ChangeContact from './ChangeContact'
import UpdateTask from './UpdateTask'
import ChangeSalesPerson from './ChangeSalesPerson';
import ChangeSalesPersonContact from './ChangeSalesPersonContact'

function AllTasks() {
    const [contactData,setContactData]=useState([])
    const [data,setData]=useState([])
    const [latestTaskStatus, setLatestTaskStatus] = useState([]);
    const [openSalesperson, setOpenSalesPerson] = React.useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openSalesPersonAndContact, setOpenSalesPersonAndContact] =
    useState(false);
    const [activeSalesPerson, setActiveSalesPerson] = useState("");
    const [allSalesPersons, setAllSalespersons] = useState([]);
    const [allContacts, setAllContact] = useState([]);
  const [activeContact, setActiveContact] = useState("");
    const [dat,setDat]=useState([])
    const [error, setError] = useState(null); // State for storing error messages
    const [open, setOpen] = React.useState(false);
    const [allStatus, setAllStatus] = useState([]);
    const [layout, setLayout] = React.useState(undefined);
    const [updateLayout, setUpdateLayout] = useState(undefined);
    const [taskId,setTaskId]=useState('')
    const [activeDropDownStatus, setActiveDropDownStatus] = useState("");
    const [allActiveStatus, setAllActiveStatus] = useState([]);
    const [selectedRow,setSelectedRow]=useState('')
    const [selectedManager,setSelectedManager]=useState('')
    const [managerNames,setManagerNames]=useState([])
    const [managerName,setManagerName]=useState([])
    // startDate usestate to store start date
  const [startDate, setStartDate] = useState("");
  // startDate usestate to store start date
  const [endDate, setEndDate] = useState("");
  console.log(activeDropDownStatus)
  useEffect(() => {
    if (activeDropDownStatus!=='') {
      console.log(activeDropDownStatus)
      fetch(`/task/getAllTaskByStatus/${activeDropDownStatus}`)
        .then((response) => response.json())
        .then((data) => {
          // Add an "id" field to each object and start with 1
          const dataWithIds = data.map((item, index) => ({
            ...item,
            id: index + 1,
          }));
          // Update the state with the modified data
          filteringRequiredData(dataWithIds);
          //setFetchedData();
          // Optionally, log the modified data
          console.log(dataWithIds);
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      getAllTasks();
    }
  }, [activeDropDownStatus]);
  console.log(data)
  const filteringRequiredData=(dataa)=>{
    console.log(dataa)
    const requiredData=dataa.map((item,index)=>({...item,id:index+1,salesPersonName:item?.salesPerson?.user?.userName,assignedManager:item?.assignedManager?.userName,contactName:item?.contactSub?.contactId?.firstName+' '+item?.contactSub?.contactId?.lastName}))
    setData(requiredData)
  }

  useEffect(()=>{
    if (contactData.length>0){
      filteringRequiredData(contactData)
    }
  },[contactData])
    const getAllTasks=()=>{
        try{
            const fetchUsers=()=>{
                api.get('/task/getAllTask')
                .then(res=>{
                    setContactData(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    }
    const getAllSalesPersonByRole = async () => {
      const apiUrl = `/app/getAllSalesPerson`;
      const authToken = localStorage.getItem("token");
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data, "sppppppppppppppppppppppp");
        let salespersonss = data.map(
          (each) => `${each.user.userName}-${each.salespersonId.slice(-4)}`
        );
        setAllSalespersons(salespersonss, "sppp");
        setError(null); // Clear any previous errors if the request succeeds
      } catch (error) {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
        setError("Failed to fetch tasks. Please try again later.");
      }
    };
  const getAllContacts = () => {
      const apiUrl = "/ContactController/get_all_contact";
      const authToken = localStorage.getItem("token");
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
            (each) => `${each?.firstName}-${each.contactId.slice(-5)}`
          );
          //console.log(data);
          setAllContact(contactNames);
        })
        .catch((error) => {
          // Handle any error that occurred during the fetch request
          console.error("Error:", error);
        });
    };
    const getAllActiveStatus = async () => {
      const apiUrl = `/app/statuses/Task_Status/Task`;
      const authToken = localStorage.getItem("token");
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          //setIsStatusLoading(false);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        //console.log(data, "Statussssssssssss");
        setAllActiveStatus(data);
        //setError(null); // Clear any previous errors if the request succeeds
      } catch (error) {
        // Handle any error that occurred during the fetch request
        //console.error("Error:", error);
        //setError("Failed to fetch tasks. Please try again later.");
      }
    };

    useEffect(()=>{
      getAllActiveStatus()
      getAllSalesPersonByRole()
      getAllContacts()
    },[])
    
    const handleFilter = () => {
      const filtered = contactData.filter((item) => {
        const itemDate = new Date(item.startDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        //console.log(itemDate, start, end);
        end.setDate(end.getDate() + 1); // Added one day to the end date
        return itemDate >= start && itemDate < end;
      });
      // set filter data array to setFilterData function
      filteringRequiredData(filtered);
    };
    const handleManagerRecords=()=>{
      if (selectedManager==='' || selectedManager==='Select Manager Name'){
        api.get('/task/getAllTask')
                .then(res=>{
                    setContactData(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
      }else{
        api.get(`task/getAllTaskByManagerId/${selectedManager}`)
      .then(res=>{
        setContactData(res.data)
        console.log(res.data)
    }).catch(err => console.log(err.message))
      }
    }

    const getAllStatusByTask = async (id) => {
      console.log(id)
      if (id === undefined) return;
      const apiUrl = `/task/getAllTaskStatusByTaskId/${id}`;
      const authToken = localStorage.getItem("token");
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data)
        setAllStatus(data.reverse());
        setLayout("center");
        setError(null); // Clear any previous errors if the request succeeds
      } catch (error) {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
        setError("Failed to fetch tasks. Please try again later.");
      }
    };
    const latestStatusByTask = async (taskId) => {
      if (!taskId) {
        return null;
      }
      const apiUrl = `/task/getLatestTaskStatusByTaskId/${taskId}`;
      const authToken = localStorage.getItem("token");
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data; // Return the fetched data
      } catch (error) {
        console.error("Error:", error);
        throw new Error(
          "Failed to fetch latest task status. Please try again later."
        );
      }
    };
  
    const handleAllStatus = (id) => {
      //console.log("triggered");
      getAllStatusByTask(id || selectedRow);
      //latestStatusByTask(id || selectedRowId);
    };
    const handleChangeContact = async () => {
    //console.log(activeContact, dat.contactId.contactId);
    const apiUrl = `/task/updateTaskByContactId/${
      dat.taskId
    }/contact_${activeContact.slice(-5)}`;
    const authToken = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response);
      toast.success("Successfully changed Contact");
      setError(null); // Clear any previous errors if the request succeeds
    } catch (error) {
      // Handle any error that occurred during the fetch request
      console.error("Error:", error);
      setError("Failed to fetch tasks. Please try again later.");
    }
  };
  const handleChangeSalesPersonAndContact = async () => {
    const apiUrl = `/task/updateTaskBySalesPersonAndContactId/${
      dat.taskId
    }/Sp_${activeSalesPerson.slice(-4)}/contact_${activeContact.slice(-5)}`;
    const authToken = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Successfully Changes Made");
      console.log(response);
      setError(null); // Clear any previous errors if the request succeeds
    } catch (error) {
      // Handle any error that occurred during the fetch request
      console.error("Error:", error);
      setError("Failed to fetch tasks. Please try again later.");
    }
  };
    const handleChangeSalespersons = async () => {
      const apiUrl = `/task/updateTaskBySalesPersonId/${
        dat.taskId
      }/Sp_${activeSalesPerson.slice(-4)}`;
      const authToken = localStorage.getItem("token");
      try {
        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        toast.success("successfully changed SalesPerson");
        console.log(response);
        setError(null); // Clear any previous errors if the request succeeds
      } catch (error) {
        // Handle any error that occurred during the fetch request
        console.error("Error:", error);
        setError("Failed to fetch tasks. Please try again later.");
      }
      //post method will be written
      //navigate("/update-task", { state: params.row });
    };
    const a=contactData.map((item,index)=>{managerNames.push([item?.assignedManager?.userId,item?.assignedManager?.userName])})
    let b=contactData.map(item=>{managerName.push(item?.assignedManager?.userName)})
    
    const uniquemanagers=new Set()
    for (let i of managerNames){
      const arraystring=JSON.stringify(i)
      uniquemanagers.add(arraystring)
    }
    let managers=Array.from(uniquemanagers,arraystring=>JSON.parse(arraystring))
    managers?.sort(function (a, b) {
      return a[0]?.localeCompare(b[0]);
      });
    console.log(managers)
    const managern=[...new Set(managerName)]
    const columns=[
      {
        width: 60,
        headerClassName: "table-header",
        cellClassName: "table-cell",
        renderCell: (params) => (
              <input
                name='poo'
                type='radio'
                checked={params.row.id===selectedRow}
                // onChange={()=>handleRowSelected(params)}
                className="button1"
              />
            ),
       },
        {
          field: "id",
          headerName: "S.No",
          width: 60,
          headerClassName: "table-header",
          cellClassName: "table-cell",
        },
        {
          field: "salesPersonName",
          headerName: "SalesPerson Name",
          width: 160,
          headerClassName: "table-header",
          cellClassName: "table-cell",
        },
        {
          field: "contactName",
          headerName: "Contact Name",
          width: 160,
          headerClassName: "table-header",
          cellClassName: "table-cell",
        },
        {
          field: "taskDescription",
          headerName: "Task Description",
          width: 300,
          headerClassName: "table-header",
          cellClassName: "table-cell",
        },
        {
          field: "startDate",
          headerName: "Start Date",
          width: 160,
          headerClassName: "table-header",
          cellClassName: "table-cell",
        },
        {
          field: "dueDate",
          headerName: "Due Date",
          width: 160,
          headerClassName: "table-header",
          cellClassName: "table-cell",
        },
        {
          field: "assignedManager",
          headerName: "Assigned Manager",
          width: 160,
          headerClassName: "table-header",
          cellClassName: "table-cell",
        },
    ]
    const onRowHandleClick=(params)=>{
      setSelectedRow(params.id)
      setDat(params.row)
      console.log(params.row.taskId)
      setTaskId(params.row.taskId)
      setTimeout(() => {
        latestStatusByTask(params.row.taskId)
          .then((latestStatusData) => {
            setLatestTaskStatus(latestStatusData);
            console.log(latestStatusData)
          })
          .catch((error) => {
            console.error("Error fetching latest task status:", error);
          });
      }, 1000);
    }
    console.log(taskId)
    console.log(dat)
  return (
      <div className=''>
      <div className='headings'>
          <h1 className='main-heading'>All Tasks</h1>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          </div>
      </div>
      {selectedRow!=='' && (
        <div>
          <h4 className="text-center"> Selected Task</h4>
          <div className="selectedTask-container">
            <div className='details-container'>
            <div style={{marginLeft:'20px'}}>    
              <p>
                <b>Sales Person : </b> {dat.salesPersonName}
              </p>
              <p>
                <b>Contact : </b> {dat?.contactSub?.contactId?.firstName+' '+dat?.contactSub?.contactId?.lastName}
              </p>
              <p>
                <b>Assigned By : </b> {dat?.assignedManager}
              </p>
              <p>
                <b>Description : </b> {dat?.taskDescription}
              </p>
            </div>
            <div style={{marginLeft:'20px'}}>
            <p>
                <b>Task Status : </b>
                {latestTaskStatus.taskStatus?.statusValue}
              </p>
              <p>
                <b>Task Outcome : </b>
                {latestTaskStatus.taskOutcome?.statusValue}
              </p>
              <p>
                <b>Start Date : </b>
                {dat?.startDate}
              </p>
              <p>
                <b>Due Date : </b>
                {dat?.dueDate}
              </p>
            </div>
            </div>
            <div>
              <Stack
                spacing={2}
                marginRight="10px"
                direction="row"
                flexWrap="wrap"
                padding="10px"
              >
                <React.Fragment>
                  <Stack direction="row" spacing={1} margin="10px">
                    <Button
                      style={{ marginBottom: "10px", marginLeft: "14px" }}
                      variant="outlined"
                      color="neutral"
                      onClick={() => {
                        //console.log(params.row.salesPersonId, "ram");
                        handleAllStatus(dat.taskId);
                      }}
                    >
                      History
                    </Button>
                  </Stack>
                  <Modal
                    open={!!layout}
                    onClose={() => {
                      setLayout(undefined);
                    }}
                  >
                    <ModalDialog
                      aria-labelledby="dialog-vertical-scroll-title"
                      layout={layout}
                    >
                      <ModalClose />
                      <div>
                        <p>
                          <b>Sales Person :</b> {dat.salesPersonName}
                        </p>
                        <p>
                          <b>Contact :</b> {dat?.contactSub?.contactId?.firstName+' '+dat?.contactSub?.contactId?.lastName}
                        </p>
                        <p>
                          <b>Assigned By :</b> {dat?.assignedManager}
                        </p>
                        <p>
                          <b>Description :</b> {dat.taskDescription}
                        </p>
                        <p>
                          <b>Task Status : </b>
                          {latestTaskStatus.taskStatus?.statusValue}
                        </p>
                        <p>
                          <b>Task Outcome : </b>
                          {latestTaskStatus.taskOutcome?.statusValue}
                        </p>
                        <p>
                          <b>Start Date : </b>
                          {dat?.startDate}
                        </p>
                        <p>
                          <b>Due Date : </b>
                          {dat?.dueDate}
                        </p>
                      </div>
                      <List
                        sx={{
                          overflow: "scroll",
                          mx: "calc(-1 * var(--ModalDialog-padding))",
                          px: "var(--ModalDialog-padding)",
                        }}
                      >
                        {allStatus.map((item, index) => (
                          <ListItem key={index}>
                            <Card variant="soft">
                              <Typography>
                                OutCome : {item?.taskOutcome?.statusValue}
                              </Typography>
                              <Typography>
                                Task Status: {item?.taskStatus?.statusValue}
                              </Typography>
                              <Typography>
                                Task Feedback :{item.taskFeedback}
                              </Typography>
                              <Typography>
                                Feedback Date : {item.feedbackDate}
                              </Typography>
                              <Typography>
                                followUpDate :{item.followUpDate}
                              </Typography>
                              <Typography>
                                LeadFeedback :{item.leadFeedback}
                              </Typography>
                              <Typography>
                                Status Date :{item.statusDate}
                              </Typography>
                            </Card>
                          </ListItem>
                        ))}
                      </List>
                    </ModalDialog>
                  </Modal>
                </React.Fragment>
                <React.Fragment>
                  <Button
                    style={{ marginBottom: "10px" }}
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpenSalesPerson(true)}
                  >
                    Change SalesPerson
                  </Button>
                  <Modal
                    open={openSalesperson}
                    onClose={() => setOpenSalesPerson(false)}
                  >
                    <ModalDialog
                      aria-labelledby="basic-modal-dialog-title"
                      aria-describedby="basic-modal-dialog-description"
                      sx={{ maxWidth: 500 }}
                    >
                      <ModalClose onClick={() => setOpen(false)} />
                      <Typography id="basic-modal-dialog-title" level="h2">
                        Change SalesPerson
                      </Typography>
                      <Stack spacing={2}>
                        <Autocomplete
                          //className="add-task-dropdown"
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={allSalesPersons}
                          value={activeSalesPerson}
                          onChange={(event, newValue) =>
                            setActiveSalesPerson(newValue)
                          }
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Sales Person" />
                          )}
                        />
                        <Button
                          onClick={() => {
                            //console.log(params.row);
                            handleChangeSalespersons(dat);
                            setOpen(false);
                          }}
                        >
                          Submit
                        </Button>
                      </Stack>
                    </ModalDialog>
                  </Modal>
                </React.Fragment>
                <React.Fragment>
                  <Button
                    style={{ marginBottom: "10px" }}
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpenContact(true)}
                  >
                    Change Contact
                  </Button>
                  <Modal
                    open={openContact}
                    onClose={() => setOpenContact(false)}
                  >
                    <ModalDialog
                      aria-labelledby="basic-modal-dialog-title"
                      aria-describedby="basic-modal-dialog-description"
                      sx={{ maxWidth: 500 }}
                    >
                      <ModalClose onClick={() => setOpen(false)} />
                      <Typography id="basic-modal-dialog-title" level="h2">
                        Change Contact
                      </Typography>
<Stack spacing={2}>
                        <Autocomplete
                          //className="add-task-dropdown"
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={allContacts}
                          value={activeContact}
                          onChange={(event, newValue) =>
                            setActiveContact(newValue)
                          }
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Sales Person" />
                          )}
                        />
                        <Button
                          onClick={() => {
                            //console.log(params.row);
                            handleChangeContact(dat);
                            setOpen(false);
                          }}
                        >
                          Submit
                        </Button>
                      </Stack>
                    </ModalDialog>
                  </Modal>
                </React.Fragment>
                <React.Fragment>
                  <Button
                    style={{ marginBottom: "10px" }}
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpenSalesPersonAndContact(true)}
                  >
                    Change Contact & SalesPerson
                  </Button>
                  <Modal
                    open={openSalesPersonAndContact}
                    onClose={() => setOpenSalesPersonAndContact(false)}
                  >
                    <ModalDialog
                      aria-labelledby="basic-modal-dialog-title"
                      aria-describedby="basic-modal-dialog-description"
                      sx={{ maxWidth: 500 }}
                    >
                      <ModalClose onClick={() => setOpen(false)} />
                      <Typography id="basic-modal-dialog-title" level="h2">
                        Change Contact & SalesPerson
                      </Typography>
                      <Stack spacing={2}>
                        <p>Sales Persons</p>
                        <Autocomplete
                          //className="add-task-dropdown"
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={allSalesPersons}
                          value={activeSalesPerson}
                          onChange={(event, newValue) =>
                            setActiveSalesPerson(newValue)
                          }
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Sales Person" />
                          )}
                        />
                        <p>Contacts</p>
                        <Autocomplete
                          //className="add-task-dropdown"
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={allContacts}
                          value={activeContact}
                          onChange={(event, newValue) =>
                            setActiveContact(newValue)
                          }
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Contacts" />
                          )}
                        />
                        <Button
                          onClick={() => {
                            //console.log(params.row);
                            handleChangeSalesPersonAndContact();
                            setOpen(false);
                          }}
                        >
                          Submit
                        </Button>
                      </Stack>
                    </ModalDialog>
                  </Modal>
                </React.Fragment>
                {/* <React.Fragment>
                  <Stack direction="row" spacing={1}>
                    <Button
                      style={{ marginBottom: "10px" }}
                      variant="outlined"
                      color="neutral"
                      onClick={() => {
                        setUpdateLayout("fullscreen");
                      }}
                    >
                      Update Task
                    </Button>
                  </Stack>
                  <Modal
                    open={!!updateLayout}
                    onClose={() => setUpdateLayout(undefined)}
                  >
                    <ModalDialog
                      aria-labelledby="layout-modal-title"
                      aria-describedby="layout-modal-description"
                      layout={updateLayout}
                    >
                      <ModalClose />
                      <UpdateTask
                        AllStatus={latestTaskStatus}
                        selectedItem={dat}
                      />
                    </ModalDialog>
                  </Modal>
                </React.Fragment> */}
              </Stack>
            </div>
          </div>
        </div>
      )}
      <br />
      <div className="test-report-date-filter">
        <select
        className='status-select'
          value={activeDropDownStatus}
          onChange={(e) => setActiveDropDownStatus(e.target.value)}
          required
        >
          <option value="">Active Status</option>
          {allActiveStatus.map((status, index) => (
            <option className="" key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
        <div></div>
        <div className="test-report-display-between">
          Start Date:{"   "}
          <input
            type="date"
            // value={startDate}
            className="test-report-date-input"
            onChange={(e) => setStartDate(new Date(e.target.value))}
            max={new Date().toISOString().split("T")[0]}
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div className="test-report-display-between">
          End Date:{" "}
          <input
            type="date"
            // value={endDate}
            className="test-report-date-input"
            onChange={(e) => setEndDate(new Date(e.target.value))}
            max={new Date().toISOString().split("T")[0]}
            style={{ marginLeft: "10px" }}
          />
        </div>
        <button
          style={{
            padding: "3px",
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
      {/* <div className='search-container'>
        <div className='search-cont'>
          <select className='select' value={selectedManager} onChange={(e)=>setSelectedManager(e.target.value)}>
            <option key='manager'>Select Manager Name</option>
            {managers.map((item,index)=>
              <option value={item[0]}key={index[0]}>{item[0]}--{item[1]}</option>
            )}
          </select>
          <button className='icon' type="button" onClick={handleManagerRecords}>
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div> */}
      <div style={{height:'400px'}}>
          {data.length > 0 ? (
              <div className='table'>
                  <DataGrid
                      rows={data}
                      columns={columns}
                      onRowClick={onRowHandleClick}
                      // onRowSelectionModelChange={onRowSelection}
                      // initialState={{
                      // pagination: {
                      //     paginationModel: { page: 0, pageSize: 10 },
                      // },
                      // }}
                      // pageSizeOptions={[5, 10, 15, 20]}
                  />
              </div>
          ): (
              "No Data Found"
          )}
      </div>
      </div>
  )
}

export default AllTasks