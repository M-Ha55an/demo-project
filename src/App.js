import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './Pages/FileUpload';
import NewPage from './Pages/NewPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './Pages/LandingPage';


function App() {
 return (
    <Router>
     <Routes>
       <Route exact path='/' element={<LandingPage />} />
        <Route path="/file-upload" element={<FileUpload />} />
        <Route path="/new-page" element={<NewPage />} />
      </Routes>
    </Router>
 );
}

export default App;
