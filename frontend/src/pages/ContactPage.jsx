import React from 'react'
import Header from '../components/Layout/Header/Header'
import Policy from '../components/Layout/Policy/Policy'
import Footer from '../components/Layout/Footer/Footer'
import Contact from '../components/Contact/Contact'

const ContactPage = () => {
  return (
    <React.Fragment>
      <Header/>
      <Contact/>
      <Policy/>
      <Footer/>
    </React.Fragment>
  )
}

export default ContactPage
