
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
const [logo,setLogo]=useState();
const apiUrl = import.meta.env.VITE_API_BASE_URL;


useEffect(()=> {
  const dialogStatus = localStorage.getItem("dialog") ? 
  JSON.parse(localStorage.getItem("dialog")) :
  localStorage.setItem("dialog", JSON.stringify(true))

  
  setTimeout(()=> {
    setIsShowDialog(dialogStatus)
  },3000)

  fetchLogo()
},[])

const fetchLogo = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/logo`);

    if (response.ok) {
      const data = await response.json();
      setLogo(data[0].img);
    } else {
      console.log("logo hatası", error);
    }
  } catch (error) {
    console.log("Giriş hatası", error);
  } 
};

  return (
    <div className="main-layout">
        <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow}/>
        <Dialog isShowDialog={isShowDialog} setIsShowDialog={setIsShowDialog}/>
        <Header logo={logo} setIsSearchShow={setIsSearchShow}/>
          {props.children}
        <Policy/>
        <Footer logo={logo}/>
    </div>
  )
}

export default MainLayout


MainLayout.protoTypes = {
    children:Proptypes.node
}