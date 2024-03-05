import React from 'react'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import Policiy from './components/Layout/Policy/Policy'
import Sliders from './components/Slider/Sliders'

const App = () => {
  return (
   <main>
    <Header/>
    <Sliders/>
    <Policiy/>
    <Footer/>
   </main>
  )
}

export default App