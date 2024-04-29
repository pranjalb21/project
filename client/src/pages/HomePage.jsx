import React, { useEffect } from 'react'
import Home from '../components/home/Home'
import { useSelector } from 'react-redux'
import { selectLogin } from '../store/authSlice'
import UserHome from '../components/userHome/UserHome'

const HomePage = ({ title }) => {
  const selectedLogin = useSelector(selectLogin);
  useEffect(() => {
    document.title = `Bookstore | ${title}`
  })
  return (
    <section>
      {selectedLogin ?
        <UserHome />:<Home />
      }
    </section>
  )
}

export default HomePage
