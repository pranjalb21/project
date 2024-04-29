import React, { useEffect } from 'react'
import Contact from '../components/contact/Contact'

const ContactPage = ({title}) => {
  useEffect(()=>{
    document.title =`Bookstore | ${title}` 
  })
  return (
    <section>
      <Contact />
    </section>
  )
}

export default ContactPage
