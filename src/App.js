import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './Pages/FileUpload';
import NewPage from './Pages/NewPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route path="/new-page" element={<NewPage />} />
      </Routes>
    </Router>
 );
}

export default App;
