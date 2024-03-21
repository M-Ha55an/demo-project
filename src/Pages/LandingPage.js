import React from 'react'
import './LandingPage.css'
import Header from '../Components/Header'
import roboimage from '../images/RoboImage.png'

export default function LandingPage() {
  return (
      <div>
          <Header />
          <div className="banner">
              <div className="headings">
                  <h1>Excel AI Agent</h1>
                  <p>Revolutionizing File Alteration and 
                      Prompt Generation</p>
                      <button className="hbutton">Request For a Demo</button> 
              </div>
              <div className="">
                  <img src={roboimage} className='img' alt="" />
              </div>
      </div>
    </div>
  )
}
