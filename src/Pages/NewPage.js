import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './NewPage.css';

export default function NewPage() {
 const location = useLocation();
 const filePreview = location.state?.filePreview || [];

 useEffect(() => {
    console.log(filePreview);
 }, [filePreview]);

 return (
    <div className='d-flex'>
        {filePreview.length > 0 && (
          <div className="table-responsive m-5">
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
         <div className="loading"></div>
    </div>
 );
}
