import { useContext } from "react"
import { CardContext } from "../../context/CardProvider"


const CardItem = ({cardItem}) => {
  const {removerFromCard} = useContext(CardContext)
  return (
    <tr className="cart-item">
    <td></td>
    <td className="cart-image">
      <img src={cardItem.img.singleImage} alt="" />
      <i onClick={()=> removerFromCard(cardItem.id)}
      className="bi bi-x delete-cart" ></i>
    </td>
    <td>{cardItem.name} </td>
    <td>$100.00</td>
    <td className="product-quantity">1</td>
    <td className="product-subtotal">$100.00</td>
  </tr>
  )
}

export default CardItem
