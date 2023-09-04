import React, { useState, useEffect } from 'react'
import {Navigate, useNavigate,Link} from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import api from '../../../util/api'
import './Offering.css'

function AllOffering() {
    const [offeringData,setOfferingData]=useState([])
    const [offeringList,setOfferingList]=useState([])
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [flooringPrice, setFlooringPrice] = useState("");
    const [ceilingPrice, setCeilingPrice] = useState("");
    const [fetchedData , setfetchedData] = useState([]);
    const [dat,setDat]=useState([])
    const [selectedRow,setSelectedRow]=useState([])

    useEffect(()=>{
        try{
            const fetchUsers=()=>{
                api.get('/OfferingController/get_all_offering')
                .then(res=>{
                    setOfferingData(res.data)
                    setOfferingList(res.data)
                    console.log(res.data)
                }).catch(err => console.log(err.message))
            }
            fetchUsers()
        }
        catch (error) {
            console.log(error.message);
          }
    },[])

    const handleFilter = () => {
      const filtered = offeringList.filter((item) => {
        const itemDate = new Date(item.validTillDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1);
      return itemDate >= start && itemDate < end;
      });
      // set filter data array to setFilterData function
      setOfferingData(filtered);
    };
    const handlePriceFilter = () => {
      const filtered = data.filter((item) => {
          const itemFlooringPrice = parseFloat(item.floorPrice);
          const itemCeilingPrice = parseFloat(item.ceilingPrice);
          return itemFlooringPrice >= parseFloat(flooringPrice) && itemCeilingPrice <= parseFloat(ceilingPrice);
      });
      setOfferingData(filtered.map((item, index) => ({ ...item, id: index + 1 })));
  };
    const handleFilterByPriceRange = () => {
      if (!flooringPrice || !ceilingPrice) {
          alert("Please enter both flooring and ceiling prices.");
          return;
      }
      const authToken=localStorage.getItem('token')
      const apiUrl = `OfferingController/get_all_offering_by_price_range/${flooringPrice}/${ceilingPrice}`;
      fetch(apiUrl, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
          },
      })
      .then((response) => response.json())
      .then((filteredData) => {
          setfetchedData(filteredData);
      })
      .catch((error) => {
          console.error("Error:", error);
      });
  };


      let data=offeringData.map((item,index)=>({...item,id:index+1}))
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
          headerName: "Offer Id",
          width: 70,
          cellClassName: "table-cell",
          headerClassName: "table-header",
        },
        {
          field: "offeringCategory",
          headerName: "Offering Category",
          width: 130,
          cellClassName: "table-cell",
          headerClassName: "table-header",
        },
        {
          field: "offeringType",
          headerName: "Offering Type",
          width: 130,
          cellClassName: "table-cell",
          headerClassName: "table-header",
        },
        {
            field: "offeringName",
            headerName: "Offering  Name",
            width: 150,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "ctc",
            headerName: "CTC",
            width: 90,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "ceilingPrice",
            headerName: "Ceiling Price",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          },
          {
            field: "floorPrice",
            headerName: "Floor Price",
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
            field: "validTillDate",
            headerName: "Valid Till Date",
            width: 130,
            cellClassName: "table-cell",
            headerClassName: "table-header",
          }
      ];
    const onRowHandleClick=(params)=>{
        setSelectedRow(params.id)
        setDat(params.row)
        localStorage.setItem('offeringRow',JSON.stringify(params?.row))
      }
  return (
        <div className='user-container'>
        <div className='headings'>
            <h1 className='main-heading'>All Offerings</h1>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            </div>
        </div>
        <div className="test-report-date-filter">
          <div className="test-report-display-between">
            Start Date:{"   "}
            <input
              type="date"
              // value={startDate}
              className="test-report-date-input"
              onChange={(e) => setStartDate(new Date(e.target.value))}
              max={new Date().toISOString().split("T")[0]}
              style={{ marginLeft: "5px" }}
            />
          </div>
          <div className="test-report-display-between">
            End Date:{" "}
            <input
              type="date"
              // value={endDate}
              className="test-report-date-input"
              onChange={(e) => setEndDate(new Date(e.target.value))}
              // max={new Date().toISOString().split("T")[0]}
              style={{ marginLeft: "5px" }}
            />
          </div>
          <button
            style={{
              padding: "1px",
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
      {/* <div className="test-report-date-filter">
          <div className="test-report-display-between">
              Floor Price:{"   "}
              <input
                  type="number"
                  value={flooringPrice}
                  className="test-report-date-input"
                  onChange={(e) => setFlooringPrice(e.target.value)}
                  style={{ marginLeft: "5px" }}
              />
          </div>
          <div className="test-report-display-between">
              Ceiling Price:{"   "}
              <input
                  type="number"
                  value={ceilingPrice}
                  className="test-report-date-input"
                  onChange={(e) => setCeilingPrice(e.target.value)}
                  style={{ marginLeft: "5px" }}
              />
          </div>
          <button
              style={{
                  padding: "3px",
                  width: "80px",
                  backgroundColor: "#004461",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "5px",
              }}
              onClick={handlePriceFilter}
          >
              Filter
          </button>
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
  )
}

export default AllOffering