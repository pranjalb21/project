import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs, selectBlogs, setDashboard } from '../../store/blogSlice';
import PostCard from '../postCards/PostCard';
import { selectUser } from '../../store/authSlice';
import { toast } from 'react-toastify';
import { setFavourites } from '../../store/favouriteSlice';

const UserHome = () => {
    const GET_BLOGS = `http://localhost:5000/blog`;
    const URL = `http://localhost:5000/blog/getBlogByUser`
    const FAV_URL = `http://localhost:5000/favourite/get`

    const selectedUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const selectedBlogs = useSelector(selectBlogs);
    const getblog = async () => {
        const result = await axios.get(GET_BLOGS).catch(err => console.log(err));
        await dispatch(getAllBlogs(result.data.data))
    }

    const getBlogsByUserId = async (id) => {
        try {
            const result = await axios.post(URL, { "user": id })
            await dispatch(setDashboard(result.data.data))
        } catch (error) {
            toast.error(`Something went wrong. Please try again.`)
        }
    }
    const getFavBlogs = async(user)=>{
      try {
        const result = await axios.post(FAV_URL, {user});
        await dispatch(setFavourites(result.data.data));
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
        if (selectedUser._id) {
            getblog();
            getBlogsByUserId(selectedUser._id)
            getFavBlogs(selectedUser._id);
        }
    }, [selectedUser])
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
