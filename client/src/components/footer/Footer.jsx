import React, { useEffect, useState } from 'react';
import { CiFacebook,CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

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
        <CiFacebook /> <FaInstagram /> <CiLinkedin />
        </div>
      </div>
    </div>
  )
}

export default Footer
