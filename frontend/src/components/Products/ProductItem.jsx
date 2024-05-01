import { useContext, useState } from "react";
import { CardContext } from "../../context/CardProvider";
import {Link} from "react-router-dom"
import "./Products.css";

const ProductItem = ({productItem}) => {

  const {cardItems,addToCard} = useContext(CardContext)


  const isHave = cardItems.find((item)=> item._id ===productItem._id)
  const originalPrice= productItem.price.current;
  const discountPercent = productItem.price.discount;

  const discountedPrice= originalPrice - (originalPrice*discountPercent)/100;



  return (
    <div
      className="product-item glide__slide"
     
      style={{width:'285px', marginLeft:'10px', marginRight:'10px'}}
    >
      <div className="product-image">
        <a href="#">
          <img src={productItem.img[0]} alt="" className="img1" />
          <img src={productItem.img[1]}alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">
        {productItem.name}
        </a>
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <div className="product-prices">
          <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
          <span className="old-price">${productItem.price.current.toFixed(2)}</span>
        </div>
        <span className="product-discount">{productItem.price.discount}%</span>
        <div className="product-links">
          <button onClick={()=>addToCard({
            ...productItem,
            price:discountedPrice
          })}
          disabled={isHave}
           className="add-to-cart" data-id="2">
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`/product/${productItem._id}`}
           className="product-link" data-id="2">
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
