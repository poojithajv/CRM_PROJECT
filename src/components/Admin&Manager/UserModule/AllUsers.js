import React, { useState, useEffect } from 'react'
import {Navigate, useNavigate,Link} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import api from '../../../util/api'
import './User.css'

function AllUsers() {
  const [dat,setDat]=useState([])
    const [users,setUsers]=useState([])
    const [usersList,setUsersList]=useState([])
    const [rolesData,setRolesData]=useState([])
    const [namesData,setNamesData]=useState([])
    const [managerData,setManagerData]=useState([])
    const [isOpen,setIsOpen]=useState(false)
    const [selectedRow,setSelectedRow]=useState([])
    const navigate=useNavigate()
    const [search, setSearch] = useState('');
    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get('/api/getAllUsersNDtos')
                .then(res=>{
                    setUsers(res.data)
                    setUsersList(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    },[])
    let a=users.map(item=>{rolesData.push(item.role)})
    
    let b=users.map(item=>{namesData.push(item.userName)})
    let c=users.map(item=>{managerData.push([item.reportingUsrId,item.reportingUsrName])})
    const uniquemanagers=new Set()
    for (let i of managerData){
      const arraystring=JSON.stringify(i)
      uniquemanagers.add(arraystring)
    }
    let managers=Array.from(uniquemanagers,arraystring=>JSON.parse(arraystring))
    managers.sort(function (a, b) {
      return a[0].localeCompare(b[0]);
      });
    let data = users.map((item, index) => ({ ...item, id: index + 1}));
    const roles=[...new Set(rolesData)]
    const names=[...new Set(namesData)]
    const columns = [
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
          field: "userName",
          headerName: "User Name",
          width: 160,
          headerClassName: "table-header",
          cellClassName: "table-cell",
        },
        {
          field: "email",
          headerName: "Email",
          width: 160,
          headerClassName: "table-header",
          cellClassName: "table-cell",
          renderCell: (params) => (
            <div style={{ wordBreak:'break-word',whiteSpace: "wrap", lineHeight: "1" }}>
              {params.value}
            </div>
          ),
        },
        {
            field: "mobileNo",
            headerName: "Mobile Number",
            width: 160,
            headerClassName: "table-header",
            cellClassName: "table-cell",
            renderCell: (params) => (
              <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
                {params.value}
              </div>
            ),
          },
          {
            field: "altMobileNo",
            headerName: "Alternate Mobile Number",
            width: 160,
            headerClassName: "table-header",
            cellClassName: "table-cell",
            renderCell: (params) => (
              <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
                {params.value}
              </div>
            ),
          },
          {
            field: "role",
            headerName: "Role",
            width: 160,
            headerClassName: "table-header",
            cellClassName: "table-cell",

          },
          {
            field: "statusValue",
            headerName: "Status",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
          },
          {
            field: "reportingUsrName",
            headerName: "Reporting To User Name",
            width: 120,
            headerClassName: "table-header",
            cellClassName: "table-cell",
          },
      ];
      const handleSearch = (e) => {
        setSearch(e.target.value);
      };
      
      const onRowHandleClick=(params)=>{
        setSelectedRow(params.id)
        console.log(JSON.stringify(params.row))
        localStorage.setItem('userRow',JSON.stringify(params.row))
        setDat(params?.row)
      }

      const viewDetails=()=>{
        setIsOpen(!isOpen)
      }
      const handleClose=()=>{
        setIsOpen(!isOpen)
      }
  return ( 
    <div>
    <div className='user-container'>
        <div className='headings'>
            <h1 className='main-heading'>All Users</h1>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <button onClick={viewDetails}>View</button>
            </div>
        </div>
        <div style={{height:'400px'}}>
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
    <Modal show={isOpen} onRequestClose={handleClose} className="modal">
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name </Form.Label>
            <Form.Control type='text' value={dat?.userName}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email Id: </Form.Label>
            <Form.Control type='text' value={dat?.email} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile Number: </Form.Label>
            <Form.Control type='text' value={dat?.mobileNo} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Alternate Mobile Number </Form.Label>
            <Form.Control type='text' value={dat?.altMobileNo} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role </Form.Label>
            <Form.Control type='text' value={dat?.role} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status </Form.Label>
            <Form.Control type='text' value={dat?.statusValue} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Reporting To</Form.Label>
            <Form.Control type='text' value={`${dat?.reportingUsrId} -- ${dat?.reportingUsrName}`} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AllUsers