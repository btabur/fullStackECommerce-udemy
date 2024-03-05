import React from 'react'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import Policiy from './components/Layout/Policy/Policy'
import Sliders from './components/Slider/Sliders'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'
import './App.css'

const App = () => {
  return (
   <main>
    <Header/>
    <Sliders/>
    <Categories/>
    <Products/>
    <Policiy/>
    <Footer/>
   </main>
  )
}

export default App