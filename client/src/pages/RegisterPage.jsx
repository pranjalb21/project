import React, { useEffect } from 'react'
import Register from '../components/register/Register'

const RegisterPage = ({title}) => {
  useEffect(()=>{
    document.title =`Bookstore | ${title}` 
  })
  return (
    <section>
      <Register />
    </section>
  )
}

export default RegisterPage
