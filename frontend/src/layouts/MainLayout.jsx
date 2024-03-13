
import { useState } from "react"
import Footer from "../components/Layout/Footer/Footer"
import Header from "../components/Layout/Header/Header"
import Policy from "../components/Layout/Policy/Policy"
import Proptypes from "prop-types"
import Search from "../components/Modals/Search"


const MainLayout = (props) => {

const [isSearchShow,setIsSearchShow] =  useState(false)
  return (
    <div className="main-layout">
        <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow}/>
        <Header setIsSearchShow={setIsSearchShow}/>
          {props.children}
        <Policy/>
        <Footer/>
    </div>
  )
}

export default MainLayout


MainLayout.protoTypes = {
    children:Proptypes.node
}