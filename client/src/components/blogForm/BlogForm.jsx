import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { addBlog } from '../../store/blogSlice';
import Loading from '../loading/Loading';

const BlogForm = () => {
    const selectedUser = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const FORM_UPLOAD = `http://localhost:5000/blog/upload`;
    const [blogForm, setBlogForm] = useState({
        userId: '',
        title: '',
        image: null,
        description: ''
    })

    const handleDataChange = (e) => {
        setBlogForm({
            ...blogForm,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        const img = e.target.files[0];
        if (img) {
            if (img.size > 1000000) {
                toast.error(`Image size should not exeed 1MB.`);
            } else if (!["image/jpg", "image/jpeg", "image/png"].includes(img.type)) {
                toast.error(`Please upload a correct image type.`);
            } else {
                setBlogForm({
                    ...blogForm,
                    image: img
                })
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('userId', blogForm.userId);
        data.append('title', blogForm.title);
        data.append('image', blogForm.image);
        data.append('description', blogForm.description);
        try {
            const result = await axios.post(FORM_UPLOAD, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success(result.data.message);
            dispatch(addBlog(result.data));
            setBlogForm({
                userId: '',
                title: '',
                image: null,
                description: ''
            })
            setLoading(false);
            navigate('/');
        } catch (error) {
            setLoading(false);
            toast.error(`Something went wrong. Please try again`, error)
        }
    }
    useEffect(() => {
        setBlogForm({
            ...blogForm,
            userId: selectedUser._id
        })
    }, [selectedUser])
    return (
        <div className='blogform-container'>
            {loading ? <Loading /> : null}
            <h1>Add you Blog</h1>
            <form className="blogform" onSubmit={handleSubmit}>
                <div className="input-text">
                    <input
                        type="text"
                        name='title'
                        placeholder='Blog title'
                        value={blogForm.title}
                        required
                        onChange={handleDataChange}
                    />
                    <label htmlFor="title">Blog title</label>
                </div>
                <div className="input-text">
                    <input
                        type="file"
                        name='image'
                        id='image'
                        accept='image/*'
                        placeholder='Blog image'
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <div className="input-text">
                    <textarea
                        name='description'
                        placeholder='Blog description'
                        value={blogForm.description}
                        required
                        onChange={handleDataChange}
                    />
                    <label htmlFor="description">Blog description</label>
                </div>
                <button type="submit" className='btn btn-primary ls-sm'>Add</button>
            </form>
        </div>
    )
}

export default BlogForm
