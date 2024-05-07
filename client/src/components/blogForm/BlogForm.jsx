import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { addBlog } from '../../store/blogSlice';

const BlogForm = () => {
    const selectedUser = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const FORM_UPLOAD = `http://localhost:5000/blog/add`;
    const [blogForm, setBlogForm] = useState({
        userId: '',
        title: '',
        image: '',
        description: ''
    })
    function base64ImageSize(base64String) {
        // Remove data URL prefix if present
        const base64WithoutPrefix = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
    
        // Decode Base64 to binary
        const binaryString = atob(base64WithoutPrefix);
    
        // Calculate size in KB
        const sizeKB = binaryString.length / 1024;
    
        return sizeKB;
    }
    const handleImage = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            const size = base64ImageSize(reader.result);
            console.log(size);
            if(size < 1024){
                setBlogForm({ ...blogForm, image: reader.result })
            }else{
                toast.error(`Please choose an image with size less than 1MB.`);
            }
        }
        reader.onerror = () => {
            toast.error('Please upload another image.');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(FORM_UPLOAD, blogForm);
            if (response.status === 201) {
                toast.success(response.data.message);
                dispatch(addBlog(response.data.blog))
                setBlogForm({
                    ...blogForm,
                    title: '',
                    image: '',
                    description: ''
                })
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
            err.response.data.extraDetails && err.response.data.extraDetails.map(msg=>{
                toast.error(msg);
            })
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
            <h1>Add you Blog</h1>
            <form className="blogform" onSubmit={handleSubmit}>
                <div className="input-text">
                    <input
                        type="text"
                        name='title'
                        placeholder='Blog title'
                        value={blogForm.title}
                        required
                        onChange={(e) => setBlogForm({ ...blogForm, [e.target.name]: e.target.value })}
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
                        onChange={handleImage}
                        required
                    />
                </div>
                <div className="input-text">
                    <textarea
                        name='description'
                        placeholder='Blog description'
                        value={blogForm.description}
                        required
                        onChange={(e) => setBlogForm({ ...blogForm, [e.target.name]: e.target.value })}
                    />
                    <label htmlFor="description">Blog description</label>
                </div>
                <button type="submit" className='btn btn-primary ls-sm'>Add</button>
            </form>
        </div>
    )
}

export default BlogForm
