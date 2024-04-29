import React from 'react'
import { Link } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";

const UserHome = () => {
    const dummyPosts = [
        {
            id: 1,
            title: 'Lorem, ipsum dolorob',
            images: ['./about.svg'],
            description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium at nihil ipsum est modi labore consectetur aut debitis quis. Dolorum.`
        },
        {
            id: 2,
            title: 'Lorem, ipsum dolor.',
            images: ['./about.svg'],
            description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium at nihil ipsum est modi labore consectetur aut debitis quis. Dolorum. lkadbgfkjjbakgjbkajdbfkbadkgbkdabgkhbafblaboboafaofbaofbsabfoiabfoiaibfiaflansfbaofboabofboabfoafoabofaofboaf`
        },
    ]
    return (
        <div className='userHome-container'>
            <div className="heading">
                <h1>Post you blog</h1>
                <Link to={"/blog/new"}className='addPost'><IoIosAddCircle className='icon'/></Link>
            </div>
            <div className='post-container'>
            {dummyPosts.map(post => (
                <div className="post" key={post.id}>
                    <div className="post-image">
                        {post.images.map((image) => (
                            <img src={image} alt="Post Image" />
                        ))}
                    </div>
                    <div className="post-content">
                        <h1 className='mb-sm'>
                            {post.title.substring(0, 15)}
                            {post.title.length >= 15 ? '...' : ''}
                        </h1>
                        <p className='mb-sm'>
                            {post.description.substring(0, 100)}
                            {post.description.length >= 100 ? '...' : ''}
                        </p>
                        <Link to={`/blog/${post.id}`}>
                        <button className='btn btn-secondary'>Read more</button>
                        </Link>
                    </div>
                </div>
            ))}
                
            </div>
        </div>
    )
}

export default UserHome
