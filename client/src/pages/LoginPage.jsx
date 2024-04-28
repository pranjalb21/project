import React, { useEffect } from 'react'
import Login from '../components/login/Login'

const LoginPage = ({title}) => {
  useEffect(()=>{
    document.title =`Bookstore | ${title}` 
  })
  return (
    <section>
      <Login />
    </section>
  )
}

export default LoginPage
