import React from 'react'

const BlogForm = () => {
    return (
        <div className='blogform-container'>
            <h1>Add you Blog</h1>
            <form className="blogform">
                <div className="input-text">
                    <input type="text" name='title' placeholder='Blog title' required />
                    <label htmlFor="title">Blog title</label>
                </div>
                <div className="input-text">
                    <input type="file" name='image' placeholder='Blog image' />
                    <label htmlFor="image">Blog image</label>
                </div>
                <div className="input-text">
                    <textarea name='description' placeholder='Blog description' />
                    <label htmlFor="description">Blog description</label>
                </div>
                <button type="submit" className='btn btn-primary ls-sm'>Add</button>
            </form>
        </div>
    )
}

export default BlogForm
