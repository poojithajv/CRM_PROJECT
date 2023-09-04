import { useState,useEffect } from "react"
import api from '../../../util/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { DataGrid } from "@mui/x-data-grid";
const SalesPersonData = () =>{
  const [dat,setDat]=useState([])
    const [SalesPeronData,SetSalesPersonData]  = useState([])
    const [salesPersonsList, setSalesPersonsList] = useState(null)
    const [salesPersons,setSalesPersons]=useState([])
    const [isOpen,setIsOpen]=useState(false)
    const [selectedName,setSelectedName]=useState('')
    const [selectedRow,setSelectedRow]=useState([])
    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get('/app/getAllSalesPerson')
                .then(res=>{
                    SetSalesPersonData(res.data)
                    setSalesPersonsList(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    },[])
    const handleRecords=()=>{
      if (selectedName==='Select Name' ||selectedName===''){
        try{
          const fetchUsers=()=>{
              api.get('/app/getAllSalesPerson')
              .then(res=>{
                  SetSalesPersonData(res.data)
                  console.log(res.data)
              }).catch(err => console.log(err.message))
          }
          fetchUsers()
      }
      catch (error) {
          console.log(error.message);
        }
      }else{
        try{
          const fetchUsers=()=>{
              api.get('/app/getAllSalesPerson')
              .then(res=>{
                  const dat=res.data.filter(item=>item.user.userName===selectedName)
                  SetSalesPersonData(dat)
                  console.log(dat)
              }).catch(err => console.log(err.message))
          }
          fetchUsers()
      }
      catch (error) {
          console.log(error.message);
        }
      }
    }
    const a=SalesPeronData.map(item=>{salesPersons.push(item.user.userName)})
    const data = SalesPeronData?.map((item,index) =>({...item,id:index+1,UserName:item.user.userName,Email:item.user.email,MobileNumber:item.user.mobileNo,AltMobileNumber:item.user.altMobileNo}))
    
    const salesPersonNames=[...new Set(salesPersons)]
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
          headerName: "SalesPerson Id",
          width: 70,
          cellClassName: "table-cell",
          headerClassName: "table-header",
        },
        {
          field: "UserName",
          headerName: "UserName",
          width: 130,
          cellClassName: "table-cell",
          headerClassName: "table-header",
        },
        {
            field: "Email",
            headerName: "Email",
            width: 150,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "MobileNumber",
            headerName: "MobileNumber",
            width: 90,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "AltMobileNumber",
            headerName: "AltMobileNumber",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "maxTarget",
            headerName: "Max Target",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "frequency",
            headerName: "Frequency",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "threshold",
            headerName: "Threshold",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "currency",
            headerName: "Currency",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "duration",
            headerName: "Duration",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
      ];
    const onRowHandleClick = (params) =>{
      localStorage.setItem("salesPersonId",params?.row?.salespersonId)
      setSelectedRow(params.id)
      setDat(params?.row)
      localStorage.setItem("salesPersonRow",JSON.stringify(params?.row))
    }
    const nameSearchHandler = (e) => {
      if (e.target.value.length > 2) {
        let regExp = new RegExp(`^${e.target.value}`, 'i')
        SetSalesPersonData(salesPersonsList.filter(sp => {
          const user = sp.user;
          return (
            //  === regExp
            regExp.test(user.userName.toLowerCase())
          );
        }))
      }
      if (e.target.value.length < 3) {
        SetSalesPersonData(salesPersonsList)
      }
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
            <h1 className='main-heading'>All SalesPersons</h1>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <button onClick={viewDetails}>View</button>
            </div>
            
        </div>
        {/* <div className='search-container'>
          <input type="text" name="sp-name" id="sp-name" className='inp' list='sp_name' onChange={nameSearchHandler} placeholder='Search by SalesPerson name' />
        </div> */}
        {/* <div className='search-container'>
           <div className='search-cont'>
            <select className='select' value={selectedName} onChange={(e)=>setSelectedName(e.target.value)} >
              <option value='Select Name' >Select Name</option>
              {salesPersonNames.map((item,index)=>
                <option  key={index}>{item}</option>
              )}
            </select>
            <button className='icon' type="button" onClick={handleRecords}>
              <i class="fa fa-search " aria-hidden="true"></i>
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
                    />
                </div>
            ): (
                "No Data Found"
            )}
        </div>
        </div>
        <Modal show={isOpen} onRequestClose={handleClose} className="modal">
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>SalesPerson Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name </Form.Label>
            <Form.Control type='text' value={dat?.UserName}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email Id: </Form.Label>
            <Form.Control type='text' value={dat?.Email} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile Number: </Form.Label>
            <Form.Control type='text' value={dat?.MobileNumber} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Alternate Mobile Number </Form.Label>
            <Form.Control type='text' value={dat?.AltMobileNumber} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Target </Form.Label>
            <Form.Control type='text' value={dat?.target} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount </Form.Label>
            <Form.Control type='text' value={dat?.amount} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Frequency </Form.Label>
            <Form.Control type='text' value={dat?.frequency} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Currency </Form.Label>
            <Form.Control type='text' value={dat?.currency} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Duraction in Months </Form.Label>
            <Form.Control type='text' value={dat?.duration} />
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
export default SalesPersonData