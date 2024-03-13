import React from "react"
import Footer from "../components/Layout/Footer/Footer"
import Header from "../components/Layout/Header/Header"
import Policy from "../components/Layout/Policy/Policy"
import Proptypes from "prop-types"


const MainLayout = (props) => {
  return (
    <React.Fragment>
        <Header/>
        {props.children}
        <Policy/>
        <Footer/>
    </React.Fragment>
  )
}

export default MainLayout


MainLayout.protoTypes = {
    children:Proptypes.node
}