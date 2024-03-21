import React from 'react'
import './LandingPage.css'
import Header from '../Components/Header'
import roboimage from '../images/RoboImage.png'
import img from '../images/Img.jpeg'
import Card from '../Components/Card'

export default function LandingPage() {
        const cardData = [
            {
              title: "Smart Input Prompting",
              paragraph: "Receive intelligent prompts to guide your input, facilitating efficient data entry and ensuring accuracy in file manipulation.",
            },
            {
              title: "Seamless File Alteration",
              paragraph: "Effortlessly create new, altered Excel files with precision, utilizing intuitive prompts and streamlined manipulation tools.",
            },
            {
              title: "Enhanced Productivity Tools",
              paragraph: "Access a suite of productivity-enhancing features within our Excel AI Wizard, empowering you to achieve more with your data in fewer steps.",
            }
          ];
  return (
      <div>
          <Header />
          <div className="banner">
              <div className="headings">
                  <h1>Excel AI Agent</h1>
                  <p>Revolutionizing File Alteration and 
                      Prompt Generation</p>
                      <button className="hbtn">Request For a Demo</button> 
              </div>
              <div className="">
                  <img src={roboimage} className='img' alt="" />
              </div>
          </div>
          <div className="about">
              <h4>About</h4>
              <p>Experience seamless Excel file manipulation and prompt generation with our Excel AI Wizard. Effortlessly create new, altered files with precision, guided by intelligent input prompts. Elevate productivity with streamlined workflows and intuitive tools, revolutionizing your Excel experience.</p>
          </div>
          <div className="hero-two d-flex">
              <div className="image">
                  <img src={img} className='sec-img' alt="" />
              </div>
              <div className="para">
                  <p>Welcome to the future of Excel file manipulation and prompt generation with our innovative Excel AI Wizard. Designed to revolutionize the way you work with Excel data, our wizard combines advanced algorithms with intuitive user interfaces to streamline your workflow and elevate your productivity. Whether you're merging, 

splitting, or rearranging sheets, columns, or rows, our tool simplifies the process with effortless drag-and-drop functionality. Additionally, our smart input prompting feature guides your data entry, ensuring accuracy and efficiency in every task. With our Excel AI Wizard, you can unlock valuable insights, make informed decisions, and transform your Excel experience like never before.</p>
              </div>
          </div>
          <div className="features">
              <h4>Features</h4>
              <p>Our Excel AI Wizard empowers effortless Excel file manipulation with features like seamless merging, splitting, and rearranging of data. Generate insightful prompts based on your data to make informed decisions and uncover valuable insights. Experience unparalleled versatility and functionality for enhanced productivity in just a few clicks.</p>
          </div>
          <div className="cards d-flex">
        {cardData.map((card, index) => (
          <Card key={index} title={card.title} paragraph={card.paragraph} />
        ))}
      </div>
    </div>
  )
}
