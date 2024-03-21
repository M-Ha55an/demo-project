import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './NewPage.css';
import loading from "../images/Loading.gif"
import Header from '../Components/Header';
import Footern from '../Components/Footern';





export default function NewPage() {
 const location = useLocation();
 const filePreview = location.state?.filePreview || [];

 useEffect(() => {
    console.log(filePreview);
 }, [filePreview]);

  return (
    <div>
      <Header/>
      <div className='container'>
        <div className='row'>
          <div className='col-6 mt-3' style={{ border: '2px solid #2B3759', borderRadius: '10px' , width:'49%'}}>
        {filePreview.length > 0 && (
          <div className="table-responsive m-5" style={{height:'299px'}}>
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
          <div className='col-6 mt-3 sc-two' style={{ border: '2px solid #2B3759', borderRadius: '10px', width:'49%'}}>
          <img src={loading} alt="Loading" className="gif" />          </div>
     </div>
      </div>
     <Footern/>
      </div>
 );
}
