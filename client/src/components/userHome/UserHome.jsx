import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs, selectBlogs } from '../../store/blogSlice';

const UserHome = () => {
    const GET_BLOGS = `http://localhost:5000/blog`;
    const dispatch = useDispatch();
    const selectedBlogs = useSelector(selectBlogs);
    const getblog = async () => {

        const result = await axios.get(GET_BLOGS).catch(err=>console.log(err));
        dispatch(getAllBlogs(result.data.data))

    }

    useEffect(() => {
        getblog()
    }, [])
    return (
        <div className='userHome-container'>
            <div className="heading">
                <h1>Post your blog</h1>
                <Link to={"/blog/new"} className='addPost'><IoIosAddCircle className='icon' /></Link>
            </div>
            <div className='post-container'>
                {selectedBlogs ? selectedBlogs.map((post,index) => (
                    <div className="post" key={index}>
                        <div className="post-image">
                                <img src={post.image} alt="Post Image" />
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
                )):<p>No blogs to show...</p>}

            </div>
        </div>
    )
}

export default UserHome
