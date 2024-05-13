import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectLogin } from '../../store/authSlice'

const Home = () => {
    const selectedLogin = useSelector(selectLogin);
    return (
        <div className='home-container'>
            <div className="leaflet">
                <div className="textDetails">
                    <h2 className='ls-sm'>
                        Welcome to Our Blogging Haven!
                    </h2>
                    <p>
                        Discover a vibrant online space where words flourish and ideas ignite. Our blog posting website is a dynamic platform, inviting writers of all stripes to share their passions, insights, and stories with the world. From thought-provoking essays to captivating personal narratives, our community fosters creativity and connection. With user-friendly tools and a supportive environment, crafting and publishing content is effortless. Engage with diverse perspectives, spark meaningful discussions, and explore an array of topics spanning from arts and culture to science and technology. Join us in shaping the digital landscape, one compelling post at a time.
                    </p>
                    <div className="goto mt-sm">
                        <NavLink to={'/contact'}>

                            <button className="btn btn-primary ls-sm">
                                Contact us
                            </button>
                        </NavLink>
                        {selectedLogin ? '' :
                            <NavLink to={'/register'}>
                                <button className="btn btn-primary ls-sm ml-md">
                                    Register
                                </button>

                            </NavLink>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home
