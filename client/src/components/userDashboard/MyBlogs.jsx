import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';
import axios from 'axios';
import { selectUserBlog, setDashboard } from '../../store/blogSlice';
import { Link } from 'react-router-dom';
import PostCard from '../postCards/PostCard';
import { toast } from 'react-toastify';

const MyBlogs = () => {
  const selectedBlogs = useSelector(selectUserBlog);
  return (
    <div className='post-container'>
      {selectedBlogs ? selectedBlogs.map((post, index) => (
        <PostCard post={post} key={index} />
      )) : <p>No blogs to show...</p>}
    </div>
  )
}

export default MyBlogs
