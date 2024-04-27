import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { selectLogin, userLogout } from '../../store/authSlice';
// import './navbar.css';
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
          isPending ? "pending navlink" : isActive ? "active navlink" : "navlink"
        }>
          <h1> BookStore</h1>
        </NavLink>
        <nav className="navlinks">
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
              <NavLink to={'/login'} className={({ isActive, isPending }) =>
                isPending ? "pending navlink" : isActive ? "active navlink" : " navlink"
              }  onClick={handleLogout}>
                <li> Logout</li>
              </NavLink> :
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
