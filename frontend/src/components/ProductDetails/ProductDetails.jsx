import { useEffect, useState } from 'react'
import Breadcrumb from './Breadcrumb/Breadcrumb'
import Gallery from './Gallery/Gallery'
import Info from './Info/Info'
import './ProductDetails.css'
import Taps from './Taps/Taps'


const ProductDetails = ({product,setProduct}) => {
 
  return (
    <section className="single-product">
    <div className="container">
        <div className="single-product-wrapper">
          
            <Breadcrumb product={product}/>
         
            <div className="single-content">
                <main className="site-main">
                  <Gallery product={product}/>
                    <Info product={product}/>
                </main>
            </div>
         
            <Taps product={product} setProduct={setProduct}/>
          

        </div>
    </div>
</section>
  )
}

export default ProductDetails