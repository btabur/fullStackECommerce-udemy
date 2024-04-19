
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ContactPage from './pages/ContactPage'

import AuthPage from './pages/AuthPage'
import CardPage from './pages/CardPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import './App.css'
import UserPage from './pages/Admin/UserPage'
import CategoryPage from './pages/Admin/Categories/CategoryPage'
import UpdateCategoryPage from './pages/Admin/Categories/UpdateCategoryPage'

const App = () => {
  return (
   <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/shop' element={<ShopPage/>} />
      <Route path='/blog' element={<BlogPage/>} />
      <Route path='/contact' element={<ContactPage/>} />
      <Route path='/card' element={<CardPage/>} />
      <Route path='/auth' element={<AuthPage/>} />
      <Route path='/product/:id' element={<ProductDetailsPage/>} />
      <Route path='/blog/:id' element={<BlogDetailPage/>} />
      <Route path='/admin/*' >
        <Route path='users' element={<UserPage/>} />
        <Route path='categories' element={<CategoryPage/>} />
        <Route path='categories/update/:id' element={<UpdateCategoryPage/>} />
      </Route>
     
   
   </Routes>
  )
}

export default App