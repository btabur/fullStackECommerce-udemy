import { useContext } from "react"
import { CardContext } from "../../context/CardProvider"


const CardItem = ({cardItem}) => {
  const {removerFromCard} = useContext(CardContext)
  console.log(cardItem);

  return (
    <tr className="cart-item">
    <td></td>
    <td className="cart-image">
      <img src={cardItem.img[0]} alt="" />
      <i onClick={()=> removerFromCard(cardItem._id)}
      className="bi bi-x delete-cart" ></i>
    </td>
    <td>{cardItem.name} </td>
    <td>${cardItem.price.toFixed(2)}</td>
    <td className="product-quantity">{cardItem.quantity}</td>
    <td className="product-subtotal">${(cardItem.quantity * cardItem.price).toFixed(2)}</td>
  </tr>
  )
}

export default CardItem
