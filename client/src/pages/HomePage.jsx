import React, { useEffect } from 'react'
import Home from '../components/home/Home'

const HomePage = ({title}) => {
  useEffect(()=>{
    document.title =`Bookstore | ${title}` 
  })
  return (
    <section>
      <Home />
    </section>
  )
}

export default HomePage
