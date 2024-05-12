import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs, selectBlogs } from '../../store/blogSlice';
import PostCard from '../postCards/PostCard';

const UserHome = () => {
    const GET_BLOGS = `http://localhost:5000/blog`;
    const dispatch = useDispatch();
    const selectedBlogs = useSelector(selectBlogs);
    const getblog = async () => {
        const result = await axios.get(GET_BLOGS).catch(err => console.log(err));
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
                {selectedBlogs ? selectedBlogs.map((post, index) => (
                    <PostCard post={post} key={index} home={true} />
                )) : <p>No blogs to show...</p>}

            </div>
        </div>
    )
}

export default UserHome
