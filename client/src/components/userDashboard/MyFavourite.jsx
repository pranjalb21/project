import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../store/authSlice'
import axios from 'axios';
import { selectFavouriteBlogs, setFavourites } from '../../store/favouriteSlice';
import PostCard from '../postCards/PostCard';

const MyFavourite = () => {
  const selectedUser = useSelector(selectUser);
  const selectedFavBlogs = useSelector(selectFavouriteBlogs);
  const dispatch = useDispatch();
  const FAV_URL = `http://localhost:5000/favourite/get`
  const getFavBlogs = async(user)=>{
    try {
      const result = await axios.post(FAV_URL, {user});
      dispatch(setFavourites(result.data.data));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    if(selectedUser._id){
      getFavBlogs(selectedUser._id);
    }
  },[selectedUser])
  return (
    <div className='post-container'>
      {
        selectedFavBlogs.length>0 ?
        selectedFavBlogs.map((blog,index)=><PostCard post={blog} key={index} dashFav={true}/>):
        <div className='no-blogs'>No blogs in favourites.</div>
      }
    </div>
  )
}

export default MyFavourite
