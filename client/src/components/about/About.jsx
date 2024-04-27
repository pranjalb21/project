import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/authSlice'

const About = () => {
  const selectedUser = useSelector(selectUser)
  return (
    <div className='about-container'>
      <h1>Hi {selectedUser?selectedUser.name:'Guest'}</h1>
      <img src="./about.svg" alt="" />
    </div>
  )
}

export default About
