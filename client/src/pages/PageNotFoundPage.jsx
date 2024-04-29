import React, { useEffect } from 'react'
import PageNotFound from '../components/pageNotFound/PageNotFound'

const PageNotFoundPage = ({title}) => {
  useEffect(()=>{
    document.title =`Bookstore | ${title}` 
  })
  return (
    <section>
      <PageNotFound />
    </section>
  )
}

export default PageNotFoundPage
