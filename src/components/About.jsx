import React from 'react'
import "../styles/About.css";
import { Link } from "react-router-dom";

function About() { 
  
    return (      
      <div className="about">        
        <span>Hi i'm Pablo ! And this is my Food App for my Individual Proyect at Henry ! &#x1F680;</span>      
        <a href="https://www.linkedin.com/in/juan-pablo-azambuyo/" target="_blank" rel="noopener noreferrer">&#10145; MY LINKEDIN PROFILE &#11013;</a>
        <Link id="alertTextLink" to="/" >
          <button className='alertButton'><b className='innerText' >GO BACK !</b></button>
        </Link>
      </div>      
    )
  }

export default About