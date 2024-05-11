import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';
import axios from 'axios';
import { selectUserBlog, setDashboard } from '../../store/blogSlice';
import { Link } from 'react-router-dom';
import PostCard from '../postCards/PostCard';

const MyBlogs = () => {
  const selectedUser = useSelector(selectUser);
  const selectedBlogs = useSelector(selectUserBlog);
  const dispatch = useDispatch();
  const URL = `http://localhost:5000/blog/getBlogByUser`
  const getBlogsByUserId = async (id) => {
    try {
      const result = await axios.post(URL, { "user": id })
      await dispatch(setDashboard(result.data.data))
    } catch (error) {
      // console.log(error);
    }
  }
  useEffect(() => {
    if (selectedUser._id) {
      getBlogsByUserId(selectedUser._id)
    }
  }, [])
  return (
    <div className='post-container'>
      {selectedBlogs ? selectedBlogs.map((post, index) => (
        <PostCard post={post} key={index} />
      )) : <p>No blogs to show...</p>}
    </div>
  )
}

export default MyBlogs
