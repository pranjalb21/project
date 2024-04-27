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
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        {/* <Route path='/services' element={<ServicePage />} /> */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/*' element={<PageNotFoundPage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
