
import { useEffect, useState } from "react"
import Footer from "../components/Layout/Footer/Footer"
import Header from "../components/Layout/Header/Header"
import Policy from "../components/Layout/Policy/Policy"
import Proptypes from "prop-types"
import Search from "../components/Modals/Search/Search"
import Dialog from "../components/Modals/Dialog/Dialog"


const MainLayout = (props) => {

const [isSearchShow,setIsSearchShow] =  useState(false);
const [isShowDialog,setIsShowDialog] = useState(false);


useEffect(()=> {
  const dialogStatus = localStorage.getItem("dialog") ? 
  JSON.parse(localStorage.getItem("dialog")) :
  localStorage.setItem("dialog", JSON.stringify(true))
  
  setTimeout(()=> {
    setIsShowDialog(dialogStatus)
  },3000)
},[])
  return (
    <div className="main-layout">
        <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow}/>
        <Dialog isShowDialog={isShowDialog} setIsShowDialog={setIsShowDialog}/>
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