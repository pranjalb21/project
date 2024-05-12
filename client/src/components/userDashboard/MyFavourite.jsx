import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../store/authSlice'
import axios from 'axios';
import { selectFavouriteBlogs, setFavourites } from '../../store/favouriteSlice';
import PostCard from '../postCards/PostCard';

const MyFavourite = () => {
  const selectedFavBlogs = useSelector(selectFavouriteBlogs);
  return (
    <div className='post-container'>
      {
        selectedFavBlogs.length > 0 ?
          selectedFavBlogs.map((blog, index) => <PostCard post={blog} key={index} dashFav={true} />) :
          <div className='no-blogs'>No blogs in favourites.</div>
      }
    </div>
  )
}

export default MyFavourite
