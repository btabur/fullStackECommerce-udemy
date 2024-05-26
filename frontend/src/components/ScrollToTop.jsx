import  { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    // her sayfaya geçiş yaptığımızda scrol en başa geçirir
    const location = useLocation()
 useEffect(()=> {
    window.scrollTo({
        top:0,
        behavior:"auto"
    },[location])
 })
}

export default ScrollToTop