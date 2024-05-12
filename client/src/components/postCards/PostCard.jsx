import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({post}) => {
    return (
        <div className="post" key={post._id}>
            <div className="post-image">
                <img src={post.imageURL} alt="Post Image" />
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
                <Link to={`/blog/${post.id}`} className='post-button'>
                    <button className='btn btn-secondary'>Read more</button>
                </Link>
            </div>
        </div>
    )
}

export default PostCard
