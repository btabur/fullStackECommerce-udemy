import React from 'react'
import Header from '../components/Layout/Header/Header'
import Policy from '../components/Layout/Policy/Policy'
import Footer from '../components/Layout/Footer/Footer'
import ProductDetails from '../components/ProductDetails/ProductDetails'

const ProductDetailsPage = () => {
  return (
   <React.Fragment>
    <Header/>
    <ProductDetails/>
    <Policy/>
    <Footer/>
   </React.Fragment>
  )
}

export default ProductDetailsPage