import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
// import ServicePage from './pages/ServicePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/navbar/Navbar';
import PageNotFoundPage from './pages/PageNotFoundPage';
import { userLogin } from './store/authSlice';
import { useDispatch } from 'react-redux';
import Blog from './components/blog/Blog';
import BlogForm from './components/blogForm/BlogForm';
import BlogFormPage from './pages/BlogFormPage';

const App = () => {
  const dispatch = useDispatch();
  const fetchUser = async ()=>{
    if (localStorage.getItem('token')) {
      try {
        const userData = await fetch(`http://localhost:5000/api/auth/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(res => res.json())
        await dispatch(userLogin({
          token: localStorage.getItem('token'),
          user: userData
        }))
      }catch(err){
        console.log(err)
      }
    }
  }
  useEffect(() => {
    fetchUser();
  }, [fetchUser, localStorage.getItem('token')])
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage title={`Home`} />} />
        <Route path='/about' element={<AboutPage title={`About`} />} />
        <Route path='/contact' element={<ContactPage title={`Contact`} />} />
        {/* <Route path='/services' element={<ServicePage />} /> */}
        <Route path='/login' element={<LoginPage title={`Login`} />} />
        <Route path='/register' element={<RegisterPage title={`Register`} />} />
        <Route path='/blog/:id' element={<Blog  title={'Blog'}/>} />
        <Route path='/blog/new' element={<BlogFormPage  title={'New Blog'}/>} />
        <Route path='/*' element={<PageNotFoundPage title={`Error`} />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
