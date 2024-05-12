import React from 'react'
import { Link } from 'react-router-dom';
import { GrFavorite } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/authSlice';
import axios from 'axios';
import {toast} from 'react-toastify';
import { addFavourite, deleteFavourite } from '../../store/favouriteSlice';

const PostCard = ({ post, home = false, dashHome = false, dashFav = false }) => {
    const dispatch = useDispatch();
    const selectedUser = useSelector(selectUser);
    const FAV_ADD_LINK = `http://localhost:5000/favourite/add`;
    const FAV_DELETE_LINK = `http://localhost:5000/favourite/delete`;

    const handleAddFavourite =async (e,blog)=>{
        e.preventDefault();
        try {
            const params = {
                user: selectedUser._id,
                blog: blog
            }
            const result = await axios.post(FAV_ADD_LINK, params);
            await dispatch(addFavourite(result.data.data))
            toast.success(result.data.message);
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
    }
    const handleDelete = async(e,blog)=>{
        if(dashFav){
            try {
                const result = await axios.post(FAV_DELETE_LINK,{user: selectedUser._id, blog});
                await dispatch(deleteFavourite(blog));
                toast.info(result.data.message);
            } catch (error) {
                toast.error(`Something went wrong. Please try again.`)
            }
        }
    }
    return (
        <div className="post" key={post._id}>
            {home ?
                <div className='favourite'>
                    <GrFavorite onClick={(e)=>handleAddFavourite(e,post._id)} />
                </div> :
                <div className='delete'>
                    <RiDeleteBinLine onClick={(e)=>handleDelete(e,post._id)} />
                </div>}
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
