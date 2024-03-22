import React from 'react';
import './Headerandfooter.css';
import { Link } from 'react-router-dom';
import aiAgentLogo from '../images/ai-agent-logo.png'; 
const Header = () => {
 return (
    <header className="header">
      <img src={aiAgentLogo} alt="Logo" className="logo" />
     <div className="buttons d-flex">
         <button className="hbutton1">About</button>
        
     <button className="hbutton2">Features</button> 
          <Link to="/file-upload">
        <button className="hbutton">Request For a Demo</button>
      </Link>
        </div>  
    </header>
 );
};

export default Header;

