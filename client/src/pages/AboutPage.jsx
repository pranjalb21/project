import React, { useEffect } from 'react'
import About from '../components/about/About'

const AboutPage = ({title}) => {
  useEffect(()=>{
    document.title =`Bookstore | ${title}` 
  },[])
  return (
    <section>
      <About />
    </section>
  )
}

export default AboutPage
