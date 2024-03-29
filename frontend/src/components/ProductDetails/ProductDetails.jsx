import Breadcrumb from './Breadcrumb/Breadcrumb'
import Gallery from './Gallery/Gallery'
import Info from './Info/Info'
import './ProductDetails.css'
import Taps from './Taps/Taps'

const ProductDetails = () => {
  return (
    <section className="single-product">
    <div className="container">
        <div className="single-product-wrapper">
          
            <Breadcrumb/>
         
            <div className="single-content">
                <main className="site-main">
                  <Gallery/>
                    <Info/>
                </main>
            </div>
         
            <Taps/>
          

        </div>
    </div>
</section>
  )
}

export default ProductDetails