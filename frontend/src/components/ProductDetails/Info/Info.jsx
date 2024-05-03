import './Info.css'
import { useContext, useEffect, useRef } from 'react';
import { CardContext } from "../../../context/CardProvider"


const Info = ({product}) => {
    const quantityRef= useRef()
    const {addToCard,cartItems}= useContext(CardContext);
    const originalPrice= product.price.current;
    const discountPercent = product.price.discount;
  
    const discountedPrice= originalPrice - (originalPrice*discountPercent)/100;
  // todo sepete eklendiğinde tekrar eklenememesi lazım 
  return (
    <div className="product-info">
                        <h1 className="product-title">
                            {product.name}
                        </h1>
                        <div className="product-review">
                            <ul className="product-star">
                                <li><i className="bi bi-star-fill"></i></li>
                                <li><i className="bi bi-star-fill"></i></li>
                                <li><i className="bi bi-star-fill"></i></li>
                                <li><i className="bi bi-star-fill"></i></li>
                                <li><i className="bi bi-star-half"></i></li>
                            </ul>
                            <span>2 reviews</span>
                        </div>
                        <div className="product-price">
                            <s className="old-price">${originalPrice.toFixed(2)}</s>
                            <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
                        </div>
                        <p className="product-description"
                        // html etiketi içerisinde gelen verileri aynen gösterebilmek için
                        dangerouslySetInnerHTML={{__html:product.description}}> 
                        
                        </p>
                        <form className="variations-form">
                            <div className="variations">
                                <div className="colors">
                                    <div className="colors-label">
                                        <span>Color</span>
                                    </div>
                                    <div className="colors-wrapper">
                                        {product.colors.map((color)=> (
                                            <div className="color-wrapper" key={color}>
                                            <label style={{
                                                backgroundColor:`#${color}`
                                            }}>
                                                <input type="radio" name="product-color"/>
                                            </label>
                                        </div>

                                        ))}
                                       
                                        
                                      
                                    </div>
                                </div>
                                <div className="values">
                                    <div className="values-label">
                                        <span>Size</span>
                                    </div>
                                    <div className="values-list">
                                        {product.size.map((size,index)=> (
                                            <span className="" key={index}>{size.toUpperCase()}</span>
                                        ))}
                                      
                                    </div>
                                </div>
                                <div className="cart-button">
                                    <input ref={quantityRef} type="number" defaultValue="1" min="1" id="quantity"/>
                                    <button  
                                      className="btn btn-lg btn-primary" id="add-to-cart" type="button"
                                  
                                    onClick={()=> addToCard({
                                        ...product,
                                        price:discountedPrice,
                                        quantity:parseInt(quantityRef.current.value)
                                    })}
                                   
                                  >Add to
                                        cart</button>
                                </div>
                                <div className="product-extra-buttons">
                                    <a href="#">
                                        <i className="bi bi-globe"></i>
                                        <span>Size Guide</span>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-heart"></i>
                                        <span>Add to Wislist</span>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-share"></i>
                                        <span>Share this Product</span>
                                    </a>
                                </div>
                            </div>
                        </form>
                        <div className="divider"></div>
                        <div className="product-meta">
                            <div className="product-sku">
                                <span>SKU:</span>
                                <strong>BE45VGRT</strong>
                            </div>
                            <div className="product-categories">
                                <span>Categories:</span>
                                <strong>Pants , Women</strong>
                            </div>
                            <div className="product-tags">
                                <span>Tags:</span>
                                <a href="#">black</a>
                                ,
                                <a href="#">white</a>
                            </div>
                        </div>
                    </div>
  )
}

export default Info
