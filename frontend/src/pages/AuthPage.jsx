import React from 'react'
import Auth from '../components/Auth/Auth'
import Header from '../components/Layout/Header/Header'
import Policy from '../components/Layout/Policy/Policy'
import Footer from '../components/Layout/Footer/Footer'

const AuthPage = () => {
  return (
    <React.Fragment>
        <Header/>
        <Auth/>
        <Policy/>
        <Footer/>
    </React.Fragment>
   
  )
}

export default AuthPage
