import React from "react";
import { Link } from 'react-router-dom'
import '../styles/LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Link to='/home'>
        <button className='button'>Ingresar al home</button>
      </Link>
    </div>
  )
};

export default LandingPage