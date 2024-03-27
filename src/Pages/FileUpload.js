import React, { useRef, useState } from 'react';
import './FileUpload.css';
import { useNavigate } from 'react-router-dom';
import { read, utils } from 'xlsx';
import Headern from '../Components/Headern';
import Footer from '../Components/Footer';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [filePreview, setFilePreview] = useState([]);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [operationName, setOperationName] = useState('');
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
            setFileUploaded(true);
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

    const handleUpload = async () => {
      if (!selectedFile) {
          setUploadStatus('Please select a file to upload.');
          return;
      }
  
      setUploadStatus('Uploading...');
  
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('txt', operationName);
  
      try {
          const response = await fetch('http://192.168.100.78:8181/agents', {
              method: 'POST',
              body: formData,
          });
  
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
  
          // Check if the response is JSON before parsing
          const contentType = response.headers.get("content-type");
          // if (contentType && contentType.indexOf("application/json") !== -1) {
          //     const data = await response;
          //     console.log(data);
          //     setUploadStatus('Upload successful!');
          //     navigate('/new-page', { state: { filePreview: filePreview } });
          // }
        if (response) {
          const data = await response;
          console.log('dataaa', data)
          navigate('/new-page', { state: { filePreview: filePreview } });
        }
          else {
              // Handle non-JSON responses here, e.g., binary data
              console.log("Received non-JSON response");
              setUploadStatus('Upload successful.');
          }
      } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          setUploadStatus('Upload failed. Please try again.');
      }
  };
  


    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <Headern/>
            <div className="square mt-5" onClick={handleBrowseClick}>
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
                {!fileUploaded && (
                    <div className="upload-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50" className="icon">
                            <path fill="#2B3759" d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/>
                        </svg>
                    </div>
                )}
            </div>
            <div className="input-field mt-3">
                <h3>Prompt</h3>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Prompt name"
                    aria-label="Operation Name"
                    aria-describedby="operation-name-help"
                    value={operationName}
                    onChange={(e) => setOperationName(e.target.value)}
                />
                <small id="operation-name-help" className="form-text text-muted">
                    Please enter the name of the operation you want to perform on the file.
                </small>
            </div>

            <button
                type="button"
                className="btn btn-primary upload-btn"
                onClick={handleUpload}
            >Upload
            </button>

            {uploadStatus && <div className="upload-status">{uploadStatus}</div>}
            <div className='space30'></div>
            <Footer/>
        </div>
    );
}

export default FileUpload;