import React from 'react';
import { Link } from 'react-router-dom';
import './Headern.css';
import aiAgentLogo from '../images/ai-agent-logo.png'; 

const Headern = () => {
    return (
        <header className="header">
             <Link to="/">
                <img src={aiAgentLogo} alt="Logo" className="logo" />
                </Link>
        </header>
    );
};

export default Headern;
