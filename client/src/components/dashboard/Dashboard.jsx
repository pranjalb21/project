import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <div className="dashboard-nav">
                <NavLink to={'/dashboard/blogs'} className={({ isActive, isPending }) =>
                  isPending ? "navlink" : isActive ? "active" : "navlink"
                }>
                    <p>Blogs</p>
                </NavLink>
                <NavLink to={'/dashboard/favourites'} className={({ isActive, isPending }) =>
                  isPending ? "navlink" : isActive ? "active" : "navlink"
                }>
                    <p>Favourites</p>
                </NavLink>
                <NavLink to={'/dashboard/profile'} className={({ isActive, isPending }) =>
                  isPending ? "navlink" : isActive ? "active" : "navlink"
                }>
                    <p>Profile</p>
                </NavLink>
            </div>
            <div className="dashboard-content">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
