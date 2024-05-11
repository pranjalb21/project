import React, { useEffect, useState } from 'react';
import { CiFacebook,CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    const [year, setYear] = useState();
    useEffect(()=>{
        const dt = new Date();
        setYear(dt.getFullYear());
    },[])
  return (
    <div className='footer-container mt-lg'>
      <p>Copyright &copy; TravelBlog {year}</p>
      <div className="details">
        <p className="text">Developed by Pranjal Gain</p>
        <div className="links">
          <Link to={''} className='footer-link' target='_blank' ><CiFacebook /></Link>
          <Link to={'https://www.instagram.com/pranjalgain/'} className='footer-link' target='_blank' ><FaInstagram /></Link>
          <Link to={'https://www.linkedin.com/in/pranjal-gain-648b5b109/'}  className='footer-link'target='_blank' ><CiLinkedin /></Link>
          
        </div>
      </div>
    </div>
  )
}

export default Footer
