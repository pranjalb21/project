import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <div className='home-container'>
            <div className="heading">
                <h1>Welcome to BookStore</h1>
            </div>
            <div className="leaflet">
                <div className="text">
                    <div className="textDetails">
                        <h2 className='ls-sm'>Lorem ipsum dolor sit amet.</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, perferendis commodi. Perspiciatis, iste? Voluptatem eveniet cumque neque quidem totam, assumenda vitae architecto dolores dicta exercitationem consequuntur laudantium in nihil perferendis, commodi similique saepe nulla blanditiis soluta molestias ad sapiente accusamus!</p>
                    </div>
                    <div className="goto">
                        <NavLink to={'/contact'}>

                            <button className="btn btn-primary ls-sm">
                                Contact us
                            </button>
                        </NavLink>
                        <NavLink to={'/register'}>
                            <button className="btn btn-secondary ls-sm ml-md">
                                Register
                            </button>

                        </NavLink>
                    </div>
                </div>
                <div className="image">
                    <img src="./book.svg" alt="Book store home page" />
                </div>
            </div>
        </div>
    )
}

export default Home
