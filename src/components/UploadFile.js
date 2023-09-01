import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../util/api'
import toast from 'react-hot-toast'
import * as XLSX from 'xlsx';
const userId = localStorage.getItem("userId")
function App() {
    const navigate=useNavigate()
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setExcelFileError(null);
        setExcelFile(selectedFile);
      } else {
        setExcelFileError('Please select an Excel file (XLSX)');
        setExcelFile(null);
      }
    } else {
      console.log('Please select a file');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const formData = new FormData();
      formData.append('Contacts', excelFile);
      const apiUrl = `ContactController/add_contact_from_excel/${userId}`;
      //const authToken = "your-auth-token"; // Replace with your actual auth token
        const authToken = localStorage.getItem('token') // Replace with your actual auth token
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        });
        if (response.ok) {
          console.log('File uploaded successfully');
          navigate('/allContacts')
        } else {
          console.error('File upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      setExcelFileError('Please select an Excel file (XLSX)');
    }
  };
  return (
    <div className="container" style={{marginTop:'20px'}}>
      <div className="form">
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <h5>Import Contacts from Excel File</h5>
          </label>
          <br />
          <input type="file" className="form-control" accept=".xlsx" onChange={handleFile} required />
          {excelFileError && <div className="text-danger" style={{ marginTop: '5px' }}>{excelFileError}</div>}
          <button type="submit" className="btn btn-success" style={{ marginTop: '5px' }}>
            Upload
          </button>
          <button type='button' className="btn btn-primary" style={{ marginTop: '5px' }} onClick={()=>navigate('/allContacts')} >Back</button>
        </form>
      </div>
    </div>
  );
}
export default App;