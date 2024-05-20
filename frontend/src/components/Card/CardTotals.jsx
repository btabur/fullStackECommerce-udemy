import { useContext, useState } from "react"
import { CardContext } from "../../context/CardProvider"
import { message } from "antd"
import {loadStripe} from "@stripe/stripe-js"


const CardTotals = () => {
  const [fastCargoChecked,setFastCargoChecked] = useState(false)
  const {cardItems} = useContext(CardContext);
  const user = localStorage.getItem("user") 
  ? JSON.parse(localStorage.getItem("user"))
  : null;

  const stripePublicKey = import .meta.env.VITE_API_STRIPE_PUBLIC_KEY
  const apiUrl = import.meta.env.VITE_API_BASE_URL

  const cardItemsTotal = cardItems.map((item) => {
    const itemTotal = item.price * item.quantity;
    return itemTotal
  })

  const subTotals = cardItemsTotal.reduce((prew,current)=> {
    return prew+current;
  },0)

  const cargoFee = 15;
  const cardTotals = fastCargoChecked ? (subTotals+cargoFee).toFixed(2) : subTotals.toFixed(2);

  const handlePay =async ()=> {
    if(!user) {
      return message.info("Önce giriş yapmalısınız")
    }
    const body = {
      products:cardItems,
      user,
      cargoFee: fastCargoChecked ? cargoFee : 0,
    }

    try {
      const stripe = await loadStripe(stripePublicKey)
      const res = await fetch(`${apiUrl}/api/payment`,{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(body)
      })
      if(!res.ok) {
          return message.error("Ödeme esnasında bir hata oldu")
      }
      const session = await res.json();
      const result = await stripe.redirectToCheckout({
        sessionId:session.id
      })

      if(result.error) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="cart-totals">
              <h2>Cart totals</h2>
              <table>
                <tbody>
                  <tr className="cart-subtotal">
                    <th>Subtotal</th>
                    <td>
                      <span id="subtotal">${subTotals.toFixed(2)}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td>
                      <ul>
                        <li>
                          <label>
                            Fast Cargo: $15.00
                            <input type="checkbox" id="fast-cargo" 
                            checked={fastCargoChecked} 
                            onChange={()=> setFastCargoChecked(!fastCargoChecked)}
                            />
                          </label>
                        </li>
                        <li>
                          <a href="#">Change Address</a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>
                      <strong id="cart-total">${cardTotals}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="checkout">
                <button className="btn btn-lg" onClick={handlePay}>Proceed to checkout</button>
              </div>
            </div>
  )
}

export default CardTotals
