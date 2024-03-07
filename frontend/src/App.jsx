import React from 'react'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import Policiy from './components/Layout/Policy/Policy'
import Sliders from './components/Slider/Sliders'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'

import Campains from './components/Campains/Campains'
import Blogs from './components/Blog/Blogs'
import './App.css'
import Brands from './components/Brand/Brands'
import CampainSingle from './components/Campain-Single/CampainSingle'

const App = () => {
  return (
   <main>
    <Header/>
    <Sliders/>
    <Categories/>
    <Products title='Featured Products' />
    <Campains/>
    <Products title='New Arrivals'/>
    <Blogs/>
    <Brands/>
    <CampainSingle/>
    <Policiy/>
    <Footer/>
   </main>
  )
}

export default App