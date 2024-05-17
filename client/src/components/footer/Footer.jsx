import React, { useEffect, useState } from 'react';
import { CiFacebook, CiLinkedin } from "react-icons/ci";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  const [year, setYear] = useState();
  useEffect(() => {
    const dt = new Date();
    setYear(dt.getFullYear());
  }, [])
  return (
    <div className='footer-container'>
      <div className="copy">
        <p>Copyright &copy; TravelBlog {year}</p>
      </div>
      <div className="details">
        <p className="text">Developed by Pranjal Gain</p>
        <div className="links">
          <Link to={'https://www.facebook.com/pranjal.gain.5/'} className='footer-link' target='_blank' ><CiFacebook /></Link>
          <Link to={'https://www.instagram.com/pranjalgain/'} className='footer-link' target='_blank' ><FaInstagram /></Link>
          <Link to={'https://www.linkedin.com/in/pranjal-gain-648b5b109/'} className='footer-link' target='_blank' ><CiLinkedin /></Link>
          <Link to={'https://github.com/pranjalb21'} className='footer-link' target='_blank' ><FaGithub /></Link>

        </div>
      </div>
    </div>
  )
}

export default Footer
