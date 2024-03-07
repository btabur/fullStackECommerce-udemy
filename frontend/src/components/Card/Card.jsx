import React from "react";
import './Card.css'
import CardProgress from "./CardProgress";
import CardTable from "./CardTable";
import CardCoupon from "./CardCoupon";
import CardTotals from "./CardTotals";

const Card = () => {
  return (
    <section className="cart-page">
      <div className="container">
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
      </div>
    </section>
  );
};

export default Card;
