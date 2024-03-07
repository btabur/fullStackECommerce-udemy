import React from 'react'
import Card from '../components/Card/Card'
import Header from '../components/Layout/Header/Header'
import Policy from '../components/Layout/Policy/Policy'
import Footer from '../components/Layout/Footer/Footer'

const CardPage = () => {
  return (
    <React.Fragment>
        <Header/>
        <Card/>
        <Policy/>
        <Footer/>
      
    </React.Fragment>
  )
}

export default CardPage
