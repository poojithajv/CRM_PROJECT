import React,{useState,useEffect} from 'react'
import Button from "@mui/joy/Button";
import {GrFormClose} from 'react-icons/gr'
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal  from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import toast from "react-hot-toast";
import { Autocomplete, Card, Radio, TextField } from "@mui/joy";
import Stack from "@mui/joy/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import { Backdrop, CircularProgress } from "@mui/material";
import {Navigate, json, useNavigate} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import AllTaskStatus from './AllTaskStatus';
import { useLocation } from 'react-router-dom';
import UpdateTask from './UpdateTask';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal as bootstrapModal} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import api from './../util/api'
import './index.css'
import SalesPersonDashboard from './SalesPersonDashboard';


const style = {
  position: 'absolute',
  height:500,
  overflowY:'scroll',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
function SalesPersonTasks() {
  const [dat,setDat]=useState([])
  const location=useLocation()
  const [isOpen,setIsOpen]=useState(false)
  const [dataa,setDataa]=useState([])
  const [salesPersonId,setSalesPersonId]=useState(location.state)
    const [tasksData,setTasksData]=useState([])
    const [contactId,setContactId]=useState('')
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
    const [error, setError] = useState(null); // State for storing error messages
    const [open, setOpen] = React.useState(false);
    const [allStatus, setAllStatus] = useState([]);
    const [layout, setLayout] = React.useState(undefined);
    const [updateLayout, setUpdateLayout] = useState(undefined);
    const [requiredData, setRequiredData] = useState([]);
    const [statusData,setStatusData]=useState(([]))
    const [isAllTasks,setIsAllTasks]=useState(false)
    const [isCreateTask,setIsCreateTask]=useState(false)
    const [isAllTaskStatus,setIsAllTaskStatus]=useState(false)
    const [isTaskLatest,setIsTaskStatus]=useState(false)
    const [isUpdateTask,setIsUpdateTask]=useState(false)
    const [isChangeContact,setIsChangeContact]=useState(false)
    const [isChangeSalesPerson,setIsChangeSalesPerson]=useState(false)
    const [isChangeSalesPersonContact,setIsChangeSalesPersonContact]=useState(false)
    const [taskId,setTaskId]=useState('')
    const [activeDropDownStatus, setActiveDropDownStatus] = useState("");
    const [allActiveStatus, setAllActiveStatus] = useState([]);
    const [selectedRow,setSelectedRow]=useState('')
    // startDate usestate to store start date
  const [startDate, setStartDate] = useState("");
  // startDate usestate to store start date
  const [endDate, setEndDate] = useState("");
   useEffect(() => {
    if (activeDropDownStatus!=='') {
      console.log(activeDropDownStatus)
      fetch(`task/getAllTaskBySalespersonIdAndStatus/${salesPersonId}/${activeDropDownStatus}`)
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
  
    const getAllTasks=()=>{
      try{
        const fetchUsers=()=>{
            api.get(`task/getAllTaskBySalesPersonId/${salesPersonId}`)
            .then(res=>{
                setTasksData(res.data)
                console.log(res.data)
            }).catch(err => console.log(err.message))
        }
        fetchUsers()
    }
    catch (error) {
        console.log(error.message);
      }
    }
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
    },[])
    
    const handleFilter = () => {
      const filtered = tasksData.filter((item) => {
        const itemDate = new Date(item.startDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        //console.log(itemDate, start, end);
        end.setDate(end.getDate() + 1); // Added one day to the end date
        return itemDate >= start && itemDate < end;
      });
      // set filter data array to setFilterData function
      filteringRequiredData(filtered)
      console.log(filtered)
    };
    const filteringRequiredData=(dataa)=>{
      console.log(dataa)
      const requiredData=dataa.map((item,index)=>({...item,id:index+1,salesPersonName:item?.salesPerson?.user?.userName,assignedManager:item?.assignedManager?.userName,contactName:item?.contactId?.firstName+item?.contactId?.lastName}))
      setData(requiredData)
      console.log(requiredData)
    }
  
    useEffect(()=>{
      if (tasksData.length>0){
        filteringRequiredData(tasksData)
      }
    },[tasksData])
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
          field: "taskDescription",
          headerName: "Task Description",
          width: 160,
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
          field: "contactName",
          headerName: "Contact Name",
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
      setDat(params?.row)
      console.log(params?.row?.contactId?.contactId)
      localStorage.setItem('contactId',params?.row?.contactId?.contactId)
      setTimeout(() => {
        console.log('hi')
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
    const viewDetails=()=>{
      let contactId=localStorage.getItem('contactId')
      api.get(`ContactController/get_contact_by_contactId/${contactId}`)
          .then(res=>{
              setDataa(res.data)
              console.log(res.data)
          }).catch(err => console.log(err.message))
      setIsOpen(!isOpen)
    }
    const handleClose=()=>{
      setIsOpen(!isOpen)
    }
    console.log(selectedRow)
  return (
    <div>
      <SalesPersonDashboard />
        <div className='user-container'>
        <div className='headings'>
            <h1 className='main-heading'>All Tasks</h1>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <button onClick={viewDetails}>View</button>
            </div>
        </div>
        {selectedRow!=='' && (
        <div>
          <h4 className="text-center"> Selected Task</h4>
          <div className="selectedTask-container">
            <div>
              <p>
                <b>Task Status :</b>
                {latestTaskStatus.taskStatus?.statusValue}
              </p>
              <p>
                <b>Sales Person :</b> {dat.salesPersonName}
              </p>
              <p>
                <b>Contact :</b> {dat?.contactId?.firstName+' '+dat?.contactId?.lastName}
              </p>
              <p>
                <b>Assigned By :</b> {dat?.assignedManager}
              </p>
              <p>
                <b>Description :</b> {dat?.taskDescription}
              </p>
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
                          <b>Task Status :</b>
                          {latestTaskStatus.taskStatus?.statusValue}
                        </p>
                        <p>
                          <b>Sales Person :</b> {dat.salesPersonName}
                        </p>
                        <p>
                          <b>Contact :</b> {dat?.contactId?.firstName+' '+dat?.contactId?.lastName}
                        </p>
                        <p>
                          <b>Assigned By :</b> {dat?.assignedManager}
                        </p>
                        <p>
                          <b>Description :</b> {dat.taskDescription}
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
                </React.Fragment>
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
        <div style={{overflowY:'auto',height:'400px'}}>
            {data.length > 0 ? (
                <div className='table'>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        onRowClick={onRowHandleClick}
                    />
                </div>
            ): (
                "No Data Found"
            )}
        </div>
        </div>
        {/* <bootstrapModal show={isOpen} onRequestClose={handleClose} className="modal">
        <bootstrapModal.Header closeButton onClick={handleClose}>
          <bootstrapModal.Title>Contact Details</bootstrapModal.Title>
        </bootstrapModal.Header>
        <bootstrapModal.Body>
          <Form.Group>
            <Form.Label>Name </Form.Label>
            <Form.Control type='text' value={dat?.firstName+' '+dat?.lastName}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email Id </Form.Label>
            <Form.Control type='text' value={dat?.email} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile Number </Form.Label>
            <Form.Control type='text' value={dat?.mobileNumber} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Company </Form.Label>
            <Form.Control type='text' value={dat?.company} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Designation </Form.Label>
            <Form.Control type='text' value={dat?.contactDesignation} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Department </Form.Label>
            <Form.Control type='text' value={dat?.contactDepartment} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address </Form.Label>
            <Form.Control type='text' value={dat?.address} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Country </Form.Label>
            <Form.Control type='text' value={dat?.country} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Website URL </Form.Label>
            <Form.Control type='text' value={dat?.websiteURL} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Social Media Link</Form.Label>
            <Form.Control type='text' value={dat?.socialMediaLink} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact Created By</Form.Label>
            <Form.Control type='text' value={dat?.contactCreatedByName} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Source</Form.Label>
            <Form.Control type='text' value={dat?.otherSourcetype===null ? dat?.source : dat?.otherSourcetype} />
          </Form.Group>
          <Form.Group>
            <Form.Label>LifeCycle Stage</Form.Label>
            <Form.Control type='text' value={dat?.lifeCycleStage} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type='text' value={dat?.date} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stage Date</Form.Label>
            <Form.Control type='text' value={dat?.stageDate} />
          </Form.Group>
        </bootstrapModal.Body>
        <bootstrapModal.Footer>
          <button
          style={{backgroundColor:"#111359",marginTop:"-7px",color:'white',padding:'3px'}}
            variant="primary"
            type="submit"
            
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            close
          </button>
        </bootstrapModal.Footer>
      </bootstrapModal> */}
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p style={{textAlign:'right'}} onClick={handleClose}><GrFormClose size={20} /></p>
        <Form.Group>
            <Form.Label>Name </Form.Label>
            <Form.Control type='text' value={dataa?.firstName+' '+dataa?.lastName}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email Id </Form.Label>
            <Form.Control type='text' value={dataa?.email} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile Number </Form.Label>
            <Form.Control type='text' value={dataa?.mobileNumber} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Company </Form.Label>
            <Form.Control type='text' value={dataa?.company} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Designation </Form.Label>
            <Form.Control type='text' value={dataa?.contactDesignation} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Department </Form.Label>
            <Form.Control type='text' value={dataa?.contactDepartment} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address </Form.Label>
            <Form.Control type='text' value={dataa?.address} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Country </Form.Label>
            <Form.Control type='text' value={dataa?.country} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Website URL </Form.Label>
            <Form.Control type='text' value={dataa?.websiteURL} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Social Media Link</Form.Label>
            <Form.Control type='text' value={dataa?.socialMediaLink} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact Created By</Form.Label>
            <Form.Control type='text' value={dataa?.contactCreatedByName} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Source</Form.Label>
            <Form.Control type='text' value={dataa?.otherSourcetype===null ? dataa?.source : dataa?.otherSourcetype} />
          </Form.Group>
          <Form.Group>
            <Form.Label>LifeCycle Stage</Form.Label>
            <Form.Control type='text' value={dataa?.lifeCycleStage} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type='text' value={dataa?.date} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stage Date</Form.Label>
            <Form.Control type='text' value={dataa?.stageDate} />
          </Form.Group>
        </Box>
      </Modal>
    </div>
  )
}

export default SalesPersonTasks