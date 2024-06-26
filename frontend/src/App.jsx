
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ContactPage from './pages/ContactPage'

import AuthPage from './pages/AuthPage'
import CardPage from './pages/CardPage'
import BlogDetailPage from './pages/BlogDetailPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import './App.css'
import UserPage from './pages/Admin/UserPage'
import CategoryPage from './pages/Admin/Categories/CategoryPage'
import UpdateCategoryPage from './pages/Admin/Categories/UpdateCategoryPage'
import CreateCategoryPage from './pages/Admin/Categories/CreateCategoryPage'
import CreateProductPage from './pages/Admin/Products/CreateProductPage'
import ProductPage from './pages/Admin/Products/ProductPage'
import UpdateProductPage from './pages/Admin/Products/UpdateProductPage '
import CouponPage from './pages/Admin/Coupons/CouponPage'
import CreateCouponPage from './pages/Admin/Coupons/CreateCouponsPage'
import UpdateCouponPage from './pages/Admin/Coupons/UpdateCouponPage'
import Success from './pages/Success'
import BlogPage from './pages/BlogPage'
import OrderPage from './pages/Admin/OrderPage'
import DashboardPage from './pages/Admin/DashboardPage'
import LogoPage from './pages/Admin/LogoPage'
import CreateBlogPage from './pages/Admin/Blog/CreateBlogPage'
import UpdateBlogPage from './pages/Admin/Blog/UpdateBlogPage '

import AdminBlogPage from './pages/Admin/Blog/AdminBlogPage'

const App = () => {
  return (
   <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/success' element={<Success/>}/>
      <Route path='/shop' element={<ShopPage/>} />
      <Route path='/blog' element={<BlogPage/>} />
      <Route path='/blog/:id' element={<BlogDetailPage/>} />
      <Route path='/contact' element={<ContactPage/>} />
      <Route path='/card' element={<CardPage/>} />
      <Route path='/auth' element={<AuthPage/>} />
      <Route path='/product/:id' element={<ProductDetailsPage/>} />
      <Route path='/blog/:id' element={<BlogDetailPage/>} />
      <Route path='/admin/*' >
        <Route index element={<DashboardPage/>} />
        <Route path='users' element={<UserPage/>} />
        <Route path='categories' element={<CategoryPage/>} />
        <Route path='categories/update/:id' element={<UpdateCategoryPage/>} />
        <Route path='categories/create' element={<CreateCategoryPage/>} />
        <Route path='products' element={<ProductPage/>} />
        <Route path='products/create' element={<CreateProductPage/>} />
        <Route path='products/update/:id' element={<UpdateProductPage/>} />
        <Route path='coupons' element={<CouponPage/>} />
        <Route path='coupons/create' element={<CreateCouponPage/>} />
        <Route path='coupons/update/:id' element={<UpdateCouponPage/>} />
        <Route path='orders' element={<OrderPage/>} />
        <Route path='logo' element={<LogoPage/>} />
        <Route path='blog' element={<AdminBlogPage/>} />
        <Route path='blog/create' element={<CreateBlogPage/>} />
        <Route path='blog/update/:id' element={<UpdateBlogPage/>} />
      </Route>
     
   
   </Routes>
  )
}

export default App