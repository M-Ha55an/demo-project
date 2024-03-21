import React from 'react';
import "./Card.css"
export default function Card({ title, paragraph }) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{paragraph}</p>
        </div>
      </div>
    </div>
  );
}

