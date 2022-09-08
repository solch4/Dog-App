import React from "react";
import { Link } from 'react-router-dom'
import '../styles/LandingPage.css'
import dogWalk from '../assets/dog-walk.png'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Link to='/home'>
        <button className='from-landing-to-home-btn'>
          Start
          <img className="dog-walk" src={dogWalk} alt='' />
        </button>
      </Link>
    </div>
  )
};

export default LandingPage