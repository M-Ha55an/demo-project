import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './NewPage.css';
import loading from "../images/Loading.gif"
import Headern from '../Components/Headern';
import Footern from '../Components/Footern';
import { read, utils } from 'xlsx'; // Import read and utils from xlsx

export default function NewPage() {
 const location = useLocation();
 const filePreview = location.state?.filePreview || [];
 const [excelData, setExcelData] = useState(null); // State to hold Excel data

 useEffect(() => {
    console.log(filePreview);
    // Example API call
    fetch('http://192.168.100.78:8181/agents')
      .then(response => response.arrayBuffer()) // Convert response to ArrayBuffer
      .then(arrayBuffer => {
        const workbook = read(arrayBuffer, { type: 'array' }); // Read the Excel file
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 }); // Convert to JSON
        setExcelData(jsonData); // Set the state with the JSON data
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
 }, []); // Empty dependency array means this effect runs once on mount

 return (
    <div>
      <Headern />
      <div className='container'>
        <div className='row'>
          <div className='col-6 mt-3' style={{ border: '2px solid #2B3759', borderRadius: '10px', width: '49%' }}>
            {filePreview.length > 0 && (
              <div className="table-responsive m-3" style={{ height: '299px' }}>
                <table className="table table-striped table-bordered d-table">
                 <thead className="thead-dark">
                    <tr>
                      {filePreview[0].map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                 </thead>
                 <tbody>
                    {filePreview.slice(1).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                 </tbody>
                </table>
              </div>
            )}
          </div>
          <div className='col-6 mt-3 sc-two' style={{ border: '2px solid #2B3759', borderRadius: '10px', width: '49%' }}>
            {excelData ? (
              <div>
                {/* Render your Excel data here */}
                <p>{JSON.stringify(excelData[0])}</p>
                {/* Example of rendering the entire data as a table */}
                <table>
                 <thead>
                    <tr>
                      {excelData[0].map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                 </thead>
                 <tbody>
                    {excelData.slice(1).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                 </tbody>
                </table>
              </div>
            ) : (
              <img src={loading} alt="Loading" className="gif" />
            )}
          </div>
        </div>
      </div>
      <Link to="/file-upload">
        <button type="button" className="btn btn-secondary back-btn">Back</button>
      </Link>
      <Footern />
    </div>
 );
}
