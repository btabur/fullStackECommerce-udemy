import React from 'react'
import Header from '../components/Layout/Header/Header'
import BlogDetail from '../components/BlogDetail/BlogDetail'
import Policy from '../components/Layout/Policy/Policy'
import Footer from '../components/Layout/Footer/Footer'

const BlogDetailPage = () => {
  return (
    <React.Fragment>
      <Header/>
      <BlogDetail/>
      <Policy/>
      <Footer/>
    </React.Fragment>

  )
}

export default BlogDetailPage
