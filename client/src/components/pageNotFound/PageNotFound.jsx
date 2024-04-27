import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div className='pageNotFound-container'>
            <img src="./pnf.svg" alt="Page not found" />
            <NavLink to={'/'}> 
            <button className='btn btn-secondary'>Return to Homepage</button>
            </NavLink>
        </div>
    )
}

export default PageNotFound
