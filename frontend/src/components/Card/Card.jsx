import React, { useContext } from "react";
import './Card.css'
import CardProgress from "./CardProgress";
import CardTable from "./CardTable";
import CardCoupon from "./CardCoupon";
import CardTotals from "./CardTotals";
import { CardContext } from "../../context/CardProvider";

const Card = () => {
  const {cardItems}= useContext(CardContext);
  
  return (
    <section className="cart-page">
      <div className="container">
        {cardItems?.length>0 ? 
          <div className="cart-page-wrapper">
          <form className="cart-form">
           <CardProgress/>
            <div className="shop-table-wrapper">
                <CardTable/> 
                <CardCoupon/>
            </div>
          </form>
          <div className="cart-collaterals">
            <CardTotals/>
          </div>
        </div>
        :
        <div>Her hangi bir ürün eklenmedi</div>
        }
      
      </div>
    </section>
  );
};

export default Card;
