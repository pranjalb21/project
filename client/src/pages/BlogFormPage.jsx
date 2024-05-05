import React, { useEffect } from 'react'
import BlogForm from '../components/blogForm/BlogForm'

const BlogFormPage = ({title}) => {
    useEffect(()=>{
        console.log(title);
        document.title = `Bookstore | ${title}` 
    },[])
  return (
    <section>
      <BlogForm />
    </section>
  )
}

export default BlogFormPage
