import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';
import axios from 'axios';
import { selectUserBlog, setDashboard } from '../../store/blogSlice';
import { Link } from 'react-router-dom';

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
      )) : <p>No blogs to show...</p>}
    </div>
  )
}

export default MyBlogs
