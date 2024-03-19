import React, { useRef, useState } from 'react';
import './FileUpload.css';
import { useNavigate } from 'react-router-dom';
import { read, utils } from 'xlsx';

function FileUpload() {
 const [selectedFile, setSelectedFile] = useState(null);
 const [uploadStatus, setUploadStatus] = useState('');
 const [filePreview, setFilePreview] = useState([]);
 const fileInputRef = useRef(null);
 const navigate = useNavigate();

 const handleBrowseClick = () => {
    fileInputRef.current.click();
 };

 const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && isExcelFile(file)) {
      setSelectedFile(file);
      setUploadStatus('');
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
        setFilePreview(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
 };

 const isExcelFile = (file) => {
    return file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
 };

 const handleUpload = () => {
    if (!selectedFile) {
       setUploadStatus('Please select a file to upload.');
       return;
    }
   
    setUploadStatus('Uploading...');
    setTimeout(() => {
       setUploadStatus('Upload successful!');
       navigate('/new-page', { state: { filePreview: filePreview } });
    }, 2000);
   };

 return (
    <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
      <div className="square">
        {selectedFile && (
          <>
            {filePreview.length > 0 && (
              <div className="table-responsive">
                <table className="table table-striped table-bordered p-table">
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
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept=".xlsx, .xls"
        />
        <button
          type="button"
          className="btn btn-outline-secondary browse-btn mb-2"
          onClick={handleBrowseClick}
        >
          Browse
        </button>
      </div>
      <div className="input-field mt-3">
        <h3>Enter Prompt</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Prompt name"
          aria-label="Operation Name"
          aria-describedby="operation-name-help"
        />
        <small id="operation-name-help" className="form-text text-muted">
          Please enter the name of the operation you want to perform on the file.
        </small>
      </div>
      <button type="button" className="btn btn-primary upload-btn" onClick={handleUpload}>
        Upload
      </button>
      {uploadStatus && <div className="upload-status">{uploadStatus}</div>}
    </div>
 );
}

export default FileUpload;
