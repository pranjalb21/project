import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { selectLogin, userLogout } from '../../store/authSlice';

import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
const Navbar = () => {
  const isLoggedIn = useSelector(selectLogin);
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(userLogout());
  }
  return (
    <header>
      <div className="container">
        <NavLink to={'/'} className={({ isActive, isPending }) =>
          isPending ? "inactive navlink" : isActive ? "inactive navlink" : " navlink"
        } >
          <div className="logo">
            <img src="./travel-bag.svg" alt="TravelBlog" />
            <div className="logo-text">
              <h1>TravellBlog</h1>
            </div>
          </div>
        </NavLink>
        <nav className="navlink-desktop-container">
          <ul>
            <NavLink to={'/'} className={({ isActive, isPending }) =>
              isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
            }>
              <li>Home</li>
            </NavLink>
            <NavLink to={'/about'} className={({ isActive, isPending }) =>
              isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
            }>
              <li>About</li>
            </NavLink>
            <NavLink to={'/contact'} className={({ isActive, isPending }) =>
              isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
            }>
              <li> Contact</li>
            </NavLink>
            {/* <NavLink to={'/services'} className={({ isActive, isPending }) =>
              isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
            }>
              <li>Services</li>
            </NavLink> */}
            {isLoggedIn ?
              <>
                <NavLink to={'/dashboard'} className={({ isActive, isPending }) =>
                  isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
                }>
                  <li>My Dashboard</li>
                </NavLink>
                <NavLink to={'/login'} className={({ isActive, isPending }) =>
                  isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
                } onClick={handleLogout}>
                  <li> Logout</li>
                </NavLink>
              </> :
              <>
                <NavLink to={'/login'} className={({ isActive, isPending }) =>
                  isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
                }>
                  <li>Login</li>
                </NavLink>
                <NavLink to={'/register'} className={({ isActive, isPending }) =>
                  isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
                }>
                  <li>Register</li>
                </NavLink>
              </>
            }


          </ul>
        </nav>
        <nav className="navlink-mobile-container">
          
          <input type="checkbox" name="nav" id="nav" />
          <label id='ham' htmlFor="nav"><GiHamburgerMenu/></label>
          <label id='outside' htmlFor="nav"></label>
          <ul>
          <label htmlFor="nav"><IoClose /></label>
            <NavLink to={'/'} className={({ isActive, isPending }) =>
              isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
            }>
              <li>Home</li>
            </NavLink>
            <NavLink to={'/about'} className={({ isActive, isPending }) =>
              isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
            }>
              <li>About</li>
            </NavLink>
            <NavLink to={'/contact'} className={({ isActive, isPending }) =>
              isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
            }>
              <li> Contact</li>
            </NavLink>
            {/* <NavLink to={'/services'} className={({ isActive, isPending }) =>
              isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
            }>
              <li>Services</li>
            </NavLink> */}
            {isLoggedIn ?
              <>
                <NavLink to={'/dashboard'} className={({ isActive, isPending }) =>
                  isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
                }>
                  <li>My Dashboard</li>
                </NavLink>
                <NavLink to={'/login'} className={({ isActive, isPending }) =>
                  isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
                } onClick={handleLogout}>
                  <li> Logout</li>
                </NavLink>
              </> :
              <>
                <NavLink to={'/login'} className={({ isActive, isPending }) =>
                  isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
                }>
                  <li>Login</li>
                </NavLink>
                <NavLink to={'/register'} className={({ isActive, isPending }) =>
                  isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
                }>
                  <li>Register</li>
                </NavLink>
              </>
            }


          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
